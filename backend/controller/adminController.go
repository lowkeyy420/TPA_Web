package controller

import (
	"fmt"
	"math"
	"net/http"
	"net/smtp"
	"os"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/lowkeyy420/oldegg/loader"
	"github.com/lowkeyy420/oldegg/model"
)

func SendNewsToSubcriber(c *gin.Context) {
	var req struct{
		Subject string
		Body string
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}


	smtpUsername := os.Getenv("EMAIL")
	smtpPassword := os.Getenv("PASS")

	var subscribers []model.User

	loader.DB.Model(model.User{}).Where("subscribe_to_email = ?", "true").Find(&subscribers)

	len := len(subscribers)

	if len < 1 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error" : "No subscribers",
		})
		return
	}


	var to []string

	for i := 0; i < len; i++ { to = append(to, subscribers[i].Email) }

	message := "Subject: " + "OldEgg News ! " + req.Subject + "\n\n" + req.Body

	fmt.Println("subscribers", to)

	auth := smtp.PlainAuth("", smtpUsername, smtpPassword, "smtp.gmail.com")

	err := smtp.SendMail("smtp.gmail.com:587",auth,smtpUsername,to,[]byte(message))

	if err != nil {
		c.String(http.StatusConflict, "Failed to send email...")
		panic(err)
	}

	c.JSON(http.StatusOK, gin.H{
		"message" : "Successfully Sent Email...",
	})
}


func NotifyCreatedShop(c *gin.Context){
	var req struct{
		Email string
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	var shop model.Shop

	result := loader.DB.First(&shop, "email = ?", req.Email); 
	
	if result.Error != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "Email Not Found",
		})
		return
	}

	smtpUsername := os.Getenv("EMAIL")
	smtpPassword := os.Getenv("PASS")


	var to []string
	to = append(to, shop.Email)

	message := "Subject: " + "Alert ! Shop Created !" + "\n\n" + "An account with your email has successfully been created!"

	auth := smtp.PlainAuth("", smtpUsername, smtpPassword, "smtp.gmail.com")

	err := smtp.SendMail("smtp.gmail.com:587",auth,smtpUsername,to,[]byte(message))

	if err != nil {
		c.String(http.StatusConflict, "Failed to send email...")
		panic(err)
	}

	c.JSON(http.StatusOK, gin.H{
		"message" : "Successfully Sent Email...",
	})
}

func GetShopByBanned(c *gin.Context){
	page, err := strconv.Atoi(c.Query("page"))
	if err != nil || page < 1 {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "Invalid page number",
		})
		return
	}

	var count int64
	loader.DB.Model(&model.Shop{}).Where("status = ?", "Banned").Count(&count)

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
	loader.DB.Offset(offset).Where("status = ?", "Banned").Order("id").Limit(limit).Find(&shops)

	c.JSON(http.StatusOK, gin.H{
		"data":  shops,
		"count": count,
	})
}

func GetShopByActive(c *gin.Context){
	page, err := strconv.Atoi(c.Query("page"))
	if err != nil || page < 1 {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "Invalid page number",
		})
		return
	}

	var count int64
	loader.DB.Model(&model.Shop{}).Where("status = ?", "Active").Count(&count)

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
	loader.DB.Offset(offset).Where("status = ?", "Active").Order("id").Limit(limit).Find(&shops)

	c.JSON(http.StatusOK, gin.H{
		"data":  shops,
		"count": count,
	})
}