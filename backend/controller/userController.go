package controller

import (
	"fmt"
	"math"
	"math/rand"
	"net/http"
	"net/smtp"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"github.com/lowkeyy420/oldegg/loader"
	"github.com/lowkeyy420/oldegg/model"
	"golang.org/x/crypto/bcrypt"
)

func SignUp(c *gin.Context) {
	//requested data

	var req struct {
		First_name string
		Last_name string
		Email string 
		Phone string
		Password string
		SubscribeToEmail bool
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	//check if email exists in shop throw error
	var shop model.Shop
	if result := loader.DB.First(&shop, "email = ?", req.Email); result.Error == nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "Email already exists in shop",
		})
		return
	}


	//password hashing
	hashed, err := bcrypt.GenerateFromPassword([]byte(req.Password),10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password",
		})
		return;
	}

	//construct user
	user := model.User{First_name:req.First_name, Last_name:req.Last_name, Email:req.Email, Phone:req.Phone, Password: string(hashed), SubscribeToEmail:req.SubscribeToEmail}

	result := loader.DB.Create(&user)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create user",
		})
		return;
	}

	//response
	c.JSON(http.StatusOK, gin.H{
		"email" : req.Email,
	})

}

func Login(c *gin.Context) {
	//requested data
	var req struct {
		Email string 
		Password string
	}
	// make sure its JSON
	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	//check user 
	var user model.User
	loader.DB.First(&user, "email = ?", req.Email)

	var shop model.Shop
	loader.DB.First(&shop, "email = ?", req.Email)

	if user.ID == 0 && shop.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid account",
		})
		return;
	}

	if user.Status == "Banned" || shop.Status == "Banned" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "User Banned",
		})
		return;
	}

	//compare hash and password

	
	if shop.ID != 0 {
		err := bcrypt.CompareHashAndPassword([]byte(shop.Password), []byte(req.Password))
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Invalid email / pass",
			})
			return;
		}
		
		//create jwt
	
		token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"sbj" : shop.ID, //subject
			"role" : shop.RoleID,
			"exp" : time.Now().Add(time.Hour * 24 * 30).Unix(),  //expiration
		})
	
		//sign and get
		generatedToken, err := token.SignedString([]byte(os.Getenv("SECRET")))
	
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Failed creating token",
			})
			return;
		}
		
		//auto set cookie
		c.SetSameSite(http.SameSiteLaxMode)
		
		
		//expiration time
		exp := 3600*24
		c.SetCookie("token", generatedToken, exp, "", "", false, false)
	
		//response
		c.JSON(http.StatusOK, gin.H{
			"token" : generatedToken,
			"expiresin" : exp,
			"user" : shop,
		})
		return;
	} else if user.ID != 0 {
		err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password))
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "Invalid email / pass",
				})
				return;
			}
			
			//create jwt
		
			token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
				"sbj" : user.ID, //subject
				"role" : user.RoleID,
				"exp" : time.Now().Add(time.Hour * 24 * 30).Unix(),  //expiration
			})
		
			//sign and get
			generatedToken, err := token.SignedString([]byte(os.Getenv("SECRET")))
		
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "Failed creating token",
				})
				return;
			}
			
			//auto set cookie
			c.SetSameSite(http.SameSiteLaxMode)
			
			
			//expiration time
			exp := 3600*24
			c.SetCookie("token", generatedToken, exp, "", "", false, false)
		
			//response
			c.JSON(http.StatusOK, gin.H{
				"token" : generatedToken,
				"expiresin" : exp,
				"user" : user,
			})
			return;
	}

}

func Ping(c *gin.Context){
	//get curr user
	user,_ := c.Get("user")

	c.JSON(http.StatusOK, gin.H{
		"message" : "You are logged in",
		"user" : user,
	})
}

func GetUser(c *gin.Context) {
	//get token
	// tokenString, err := c.Cookie("Authorization")
	header := c.Request.Header.Get("Authorization")
	if len(header) <= 7 {
		c.AbortWithStatus(http.StatusUnauthorized)
		return;
	}

	fmt.Println("TOKENPOST : " + header)
	tokenString := header[7:]

	token,_ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}	
			return []byte(os.Getenv("SECRET")), nil
		})
		
		if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
			//validate expiration
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		role := claims["role"].(float64)

		if role == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
			return;
		}
		
		if role == 2 {
			fmt.Println("MASUK Get shop")

			var shop model.Shop;
			loader.DB.First(&shop, claims["sbj"])

			if shop.ID == 0 {
				c.AbortWithStatus(http.StatusUnauthorized)
				return;
			}

			
			//attach to request
			c.Set("user", shop)
	
			//send user
			c.JSON(http.StatusOK, gin.H{
				"ID": shop.ID,
				"Name": shop.Name,
				"Email": shop.Email,
				"Description": shop.Description,
				"Status": shop.Status,
				"Image": shop.Image,
				"RoleID": shop.RoleID,
			})


		} else {
			fmt.Println("MASUK Get User")

			var user model.User
			//find user with token subject
			loader.DB.First(&user, claims["sbj"])
			
			if user.ID == 0 {
				c.AbortWithStatus(http.StatusUnauthorized)
				return;
			}
	
			//attach to request
			c.Set("user", user)
	
			//send user
			c.JSON(http.StatusOK, gin.H{
				"ID": user.ID,
				"Email": user.Email,
				"First_name": user.First_name,
				"Last_name": user.Last_name,
				"Phone": user.Phone,
				"RoleID": user.RoleID,
				"Status": user.Status,
				"Balance" : user.Balance,
			})
		}
		
		c.Next();

	} else {
		c.AbortWithStatus(http.StatusUnauthorized)
	}

}

func GetAllUser(c *gin.Context){
	
    page, err := strconv.Atoi(c.Query("page"))
    if err != nil || page < 1 {
        c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
            "error": "Invalid page number",
        })
        return
    }

	var count int64
	loader.DB.Model(&model.User{}).Count(&count)


	offset := (page - 1) *  loader.ITEM_PER_PAGE
	limit :=  loader.ITEM_PER_PAGE

	max := int(math.Ceil(float64(count) / float64(limit)))

	fmt.Println("max ", max, " page ", page)

	if page >  max {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
            "error": "Invalid page number",
        })
        return
	}

	var users []model.User
	loader.DB.Offset(offset).Order("id").Limit(limit).Find(&users)
	

	c.JSON(http.StatusOK, gin.H{
		"data" : users,
		"count" : count,
	})
}

func UpdateUserStatus(c *gin.Context){
	id := c.Query("id")
	var user model.User

	//check user exists
	result := loader.DB.First(&user, id)


	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found",
		})
		return
	}

	//read body

	var req struct {
		Status string
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}


	//update
	user.Status = req.Status

	if err := loader.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update user",
		})
		return
	}

	c.JSON(http.StatusOK, user)

}

func GetUserAddress(c *gin.Context){
	email := c.Query("email")

	
	var user model.User
    if result := loader.DB.First(&user, "email = ?", email); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "No user with that email",
        })
        return
    }
	
	var address model.Address
	res := loader.DB.First(&address, "user_id = ?", user.ID)

	if res.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "No Address Yet",
        })
        return
	}

	c.JSON(http.StatusOK, gin.H{
		"data" : address,
	})



}

func GetUserNotification(c *gin.Context){
	id := c.Query("id")

	var user model.User

	//check user exists
	result := loader.DB.First(&user, id)


	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found",
		})	
	}


	var notifications []model.Notification

	find := loader.DB.Model(model.Notification{}).Where("user_id = ?", user.ID).Find(&notifications)


	if find.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "No Notification",
		})
	}

	
	c.JSON(http.StatusOK, gin.H{
		"data" : notifications,
	})

}


func GetOneTimeSignInCode(c *gin.Context) {

	var req struct {
		Email string
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	var user model.User
    if result := loader.DB.First(&user, "email = ?", req.Email); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "No user with that email",
        })
        return
    }

	var code model.OneTimeCode
	code.Email = req.Email

	code.Code = strconv.Itoa(100000 + rand.Intn(999999-100000))

	var countEmail int64
	loader.DB.Model(model.OneTimeCode{}).Where("email = ?", code.Email).Count(&countEmail)

	if countEmail == 0 {
		loader.DB.Create(&code)
	} else {
		var userCode model.OneTimeCode
		loader.DB.Model(model.OneTimeCode{}).Where("email = ?", code.Email).First(&userCode)
		userCode.Code = code.Code
		loader.DB.Save(&userCode)
	}

	c.JSON(http.StatusOK, gin.H{
		"data" : code,
	})
}

func SignInWithOneTimeCode(c *gin.Context) {

	var req struct {
		Email string 
		Code  string 
	}

	
	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	var user model.User
    if result := loader.DB.First(&user, "email = ?", req.Email); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "No user with that email",
        })
        return
    }

	var code model.OneTimeCode
	loader.DB.Model(model.OneTimeCode{}).Where("email = ?", req.Email).Where("code = ?", req.Code).First(&code)

	if code.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Invalid Code",
        })
        return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sbj" : user.ID, //subject
		"role" : user.RoleID,
		"exp" : time.Now().Add(time.Hour * 24 * 30).Unix(),  //expiration
	})

	generatedToken, err := token.SignedString([]byte(os.Getenv("SECRET")))
	
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed creating token",
		})
		return;
	}
	
	//auto set cookie
	c.SetSameSite(http.SameSiteLaxMode)
	
	
	//expiration time
	exp := 3600*24
	c.SetCookie("token", generatedToken, exp, "", "", false, false)

	// Check if Code is Still Valid
    // Check if the last updated time is less than 2 minutes ago
    if time.Since(code.UpdatedAt) > 15*time.Minute {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Token is no longer valid",
		})
        return
    }

	c.JSON(http.StatusOK, gin.H{
		"token" : generatedToken,
		"expiresin" : exp,
		"user" : user,
	})
	return;

}


func RequestForgotPassword(c *gin.Context){
	
	var req struct {
		Email string
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	var user model.User
    if result := loader.DB.First(&user, "email = ?", req.Email); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "No user with that email",
        })
        return
    }

	var code model.OneTimeCode
	code.Email = req.Email
	code.Code = strconv.Itoa(100000 + rand.Intn(999999-100000))

	var countEmail int64
	loader.DB.Model(model.OneTimeCode{}).Where("email = ?", code.Email).Count(&countEmail)

	if countEmail == 0 {
		loader.DB.Create(&code)
	} else {
		var userCode model.OneTimeCode
		loader.DB.Model(model.OneTimeCode{}).Where("email = ?", code.Email).First(&userCode)


		if time.Since(userCode.UpdatedAt) < 2*time.Minute {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "You must wait 2 minutes before requesting another code !",
			})
			return
		}

		userCode.Code = code.Code
		loader.DB.Save(&userCode)
		
	}

	smtpUsername := os.Getenv("EMAIL")
	smtpPassword := os.Getenv("PASS")

	message := "Subject: " + "Forgot Password Code !" + "\n\n" + "Use this code to sign in : " + code.Code


	auth := smtp.PlainAuth("", smtpUsername, smtpPassword, "smtp.gmail.com")
	var to []string
	to = append(to, code.Email)

	err := smtp.SendMail("smtp.gmail.com:587",auth,smtpUsername,to,[]byte(message))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed sending email..",
		})
		panic(err)
	}

	c.JSON(http.StatusOK, gin.H{
		"data" : "Please Check your email for the code...",
	})
}

func SignInForgoPasswordCode(c *gin.Context) {

	var req struct {
		Email string 
		Code  string 
	}

	
	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	var user model.User
    if result := loader.DB.First(&user, "email = ?", req.Email); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "No user with that email",
        })
        return
    }

	var code model.OneTimeCode
	loader.DB.Model(model.OneTimeCode{}).Where("email = ?", req.Email).Where("code = ?", req.Code).First(&code)

	if code.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Invalid Code",
        })
        return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sbj" : user.ID, //subject
		"role" : user.RoleID,
		"exp" : time.Now().Add(time.Hour * 24 * 30).Unix(),  //expiration
	})

	generatedToken, err := token.SignedString([]byte(os.Getenv("SECRET")))
	
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed creating token",
		})
		return;
	}
	
	//auto set cookie
	c.SetSameSite(http.SameSiteLaxMode)
	
	
	//expiration time
	exp := 3600*24
	c.SetCookie("token", generatedToken, exp, "", "", false, false)

	// Check if Code is Still Valid
    // Check if the last updated time is less than 2 minutes ago
    if time.Since(code.UpdatedAt) > 5*time.Minute {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Token is no longer valid",
		})
        return
    }

	c.JSON(http.StatusOK, gin.H{
		"token" : generatedToken,
		"expiresin" : exp,
		"user" : user,
	})
	return;

}



func SubscribeToEmail(c *gin.Context) {
	var req struct {
		ID int
	}
	
	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	var user model.User
    if result := loader.DB.First(&user, "id = ?", req.ID); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found",
        })
        return
    }

	user.SubscribeToEmail = true

	if err := loader.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to subcribe email",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message"  : "Successfully subscribed",
	})
}

func SaveQuery(c *gin.Context) {
	
	var req struct{
		Email string
		Keyword string
		InnerKeyword string
		IsAvailableOnly bool

	}
	
	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	if req.Email == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "You must sign in first",
		})
		return;
	}

	var user model.User
    if result := loader.DB.First(&user, "email = ?", req.Email); result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "No user with that email",
        })
        return
    }

	var countSearchQueries int64
	loader.DB.Model(model.SearchQuery{}).Where("email = ?", req.Email).Count(&countSearchQueries)

	if countSearchQueries >= 10 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "You already have 10 or more search queries",
		})
		return;
	}

	query := model.SearchQuery{Email: req.Email, Keyword: req.Keyword, InnerKeyword: req.InnerKeyword, IsAvailableOnly: req.IsAvailableOnly}

	
	result := loader.DB.Create(&query)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to save search query",
		})
		return;
	}

	c.JSON(http.StatusOK, gin.H{
		"message"  : "Successfully Created Search Query",
	})
	
}


func GetPopularQueries(c *gin.Context){
	var queries []model.SearchQuery

	loader.DB.Model(model.SearchQuery{}).Distinct("keyword").Limit(4).Find(&queries);

	c.JSON(http.StatusOK, gin.H{
		"data" : queries,
		"count" : 4,
	})
}