package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lowkeyy420/oldegg/loader"
	"github.com/lowkeyy420/oldegg/model"
)

func GetUserReviews(c *gin.Context) {

	find := c.Query("id")
	var user model.Shop

	//check user exists
	result := loader.DB.First(&user, find)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found",
		})
		return
	}

	var reviews []model.Review
	loader.DB.Model(model.Review{}).Where("user_id = ?", user.ID).Find(&reviews)

	c.JSON(http.StatusOK, reviews)

}

func DeleteReview(c *gin.Context) {

	var req struct {
		ReviewId int
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	user, exists := c.Get("user")
	if !exists {
		return;
	}
	currentUserID := user.(model.User).ID

	var toDelete model.Review
	loader.DB.Model(model.Review{}).Where("id = ?", req.ReviewId).First(&toDelete)


	if toDelete.UserID != int(currentUserID) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "You are not this user!",
		})
		return;
	}

	loader.DB.Delete(&toDelete)
	c.JSON(http.StatusOK, gin.H{
		"message" : "Successfully Deleted",
	})

}

func UpdateReview(c *gin.Context) {
	var req struct {
		ReviewId int
		Rating   int    
		Details  string 
	}

	user, exists := c.Get("user")
	if !exists {
		return;
	}
	currentUserID := user.(model.User).ID



	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	var toUpdate model.Review
	loader.DB.Model(model.Review{}).Where("id = ?", req.ReviewId).First(&toUpdate)

	if toUpdate.UserID != int(currentUserID) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "You are not this user!",
		})
		return;
		
	} 
		
		// Update Here
		toUpdate.Rating = req.Rating
		toUpdate.Details = req.Details
		loader.DB.Save(&toUpdate)
		c.JSON(http.StatusOK, gin.H{
			"message" : "Successfully Update",
		})

}
