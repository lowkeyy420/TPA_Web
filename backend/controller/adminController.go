package controller

import (
	"fmt"
	"net/http"
	"net/smtp"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/lowkeyy420/oldegg/loader"
	"github.com/lowkeyy420/oldegg/model"
)

func SendNewsToSubcriber(c *gin.Context) {
	var req struct{
		From string
		Subject string
		Body string
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}


	// smtpHost := "smtp.gmail.com:"
	// smtpPort := "587"
	smtpUsername := os.Getenv("EMAIL")
	smtpPassword := os.Getenv("PASS")

	var subscribers []model.User

	loader.DB.Model(model.User{}).Where("subscribe_to_email = ?", "true").Find(&subscribers)

	len := len(subscribers)
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