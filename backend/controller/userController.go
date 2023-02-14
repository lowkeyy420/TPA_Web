package controller

import (
	"net/http"
	"os"
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
	user := model.User{First_name:req.First_name, Last_name:req.Last_name, Email:req.Email, Phone:req.Phone, Password: string(hashed)}

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
	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET")))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed creating token",
		})
		return;
	}
	//auto set cookie
	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("auth", tokenString, 3600 * 24, "", "", false, false)

	//response
	c.JSON(http.StatusOK, gin.H{
		"token" : tokenString,
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