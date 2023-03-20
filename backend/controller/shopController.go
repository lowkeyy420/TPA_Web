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

func CreateShop(c *gin.Context) {
	//requested data
	var req struct {
		Name    	string
		Email		string
		Password    string
		Description string
		Image       string
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	//password hashing
	hashed, err := bcrypt.GenerateFromPassword([]byte(req.Password), 10)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to hash password",
		})
		return
	}

	//construct shop
	shop := model.Shop{Name: req.Name, Email : req.Email, Password : string(hashed), Description: req.Description, Image: req.Image}

	result := loader.DB.Create(&shop)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create shop",
		})
		return
	}

	//response
	c.JSON(http.StatusOK, gin.H{
		"email": req.Email,
	})

}


		


func GetShop(c *gin.Context) {
	//get token
	// tokenString, err := c.Cookie("Authorization")
	header := c.Request.Header.Get("Authorization")
	if len(header) <= 7 {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	fmt.Println("TOKENPOST : " + header)
	tokenString := header[7:]

	token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
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

		//find shop with token subject
		var shop model.Shop
		loader.DB.First(&shop, claims["sbj"])

		if shop.ID == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		//attach to request
		c.Set("shop", shop)

		//send shop
		c.JSON(http.StatusOK, gin.H{
			"ID": shop.ID,
			"Name": shop.Name,
			"Email": shop.Email,
			"Description": shop.Description,
			"Status": shop.Status,
			"Image": shop.Image,
			"RoleID": shop.RoleID,
		})
		c.Next()

	} else {
		c.AbortWithStatus(http.StatusUnauthorized)
	}

}

func GetAllShop(c *gin.Context) {

	page, err := strconv.Atoi(c.Query("page"))
	if err != nil || page < 1 {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "Invalid page number",
		})
		return
	}

	var count int64
	loader.DB.Model(&model.Shop{}).Count(&count)

	offset := (page - 1) * loader.ITEM_PER_PAGE
	limit := loader.ITEM_PER_PAGE

	max := int(math.Ceil(float64(count) / float64(limit)))

	fmt.Println("max ", max, " page ", page)

	if page > max {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "Invalid page number",
		})
		return
	}

	var shops []model.Shop
	loader.DB.Offset(offset).Order("id").Limit(limit).Find(&shops)

	c.JSON(http.StatusOK, gin.H{
		"data":  shops,
		"count": count,
	})
}

func UpdateShopStatus(c *gin.Context) {
	id := c.Query("id")
	var shop model.Shop

	//check shop exists
	result := loader.DB.First(&shop, id)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Shop not found",
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
		return
	}

	//update
	shop.Status = req.Status

	if err := loader.DB.Save(&shop).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update shop",
		})
		return
	}

	c.JSON(http.StatusOK, shop)

}


func GetShopById(c *gin.Context) {
	id := c.Query("id")
	var shop model.Shop

	//check shop exists
	result := loader.DB.First(&shop, id)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Shop not found",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"ID": shop.ID,
		"Name": shop.Name,
		"Email": shop.Email,
		"Description": shop.Description,
		"Status": shop.Status,
		"Image": shop.Image,
		"RoleID": shop.RoleID,
	})

}