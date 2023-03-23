package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lowkeyy420/oldegg/loader"
	"github.com/lowkeyy420/oldegg/model"
)

func CreateAddress(c *gin.Context) {

	var req struct{
		UserID int
		Address string
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}
	
	address := model.Address{UserID: req.UserID, Address: req.Address}

	result := loader.DB.Create(&address)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to add address",
		})
		return;
	}

	//response
	c.JSON(http.StatusOK, gin.H{
		"message" : "Successfully added adress",
	})

}

func GetAddresses(c *gin.Context) {
	//userid
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

	var addresses []model.Address
	loader.DB.Model(model.Address{}).Where("user_id = ?", id).Find(&addresses)

	c.JSON(http.StatusOK, addresses)

}

func RemoveAddress(c *gin.Context) {


	var req struct{
		AddressID int
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	var toDelete model.Address

	loader.DB.Model(model.Address{}).Where("id = ?", req.AddressID).Find(&toDelete)

	if toDelete.ID == 0{
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to find address",
		})
		return;
	}

	loader.DB.Model(model.Address{}).Delete(&toDelete)

	c.JSON(http.StatusOK, gin.H{
		"message" : "Successfully Removed Address",
	})

}
