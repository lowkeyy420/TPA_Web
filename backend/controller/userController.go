package controller

import (
	"fmt"
	"math"
	"net/http"
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
	

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid account",
		})
		return;
	}

	if user.Status == "Banned" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "User Banned",
		})
		return;
	}

	//compare hash and password
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
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}	
		return []byte(os.Getenv("SECRET")), nil
	})
	
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		//validate expiration
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}
		
		//find user with token subject
		var user model.User
		loader.DB.First(&user, claims["sbj"])
		
		if user.ID == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
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