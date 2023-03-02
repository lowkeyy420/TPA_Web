package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lowkeyy420/oldegg/loader"
	"github.com/lowkeyy420/oldegg/model"
)

func AddPromotion(c *gin.Context) {
	var req struct {
		URL string
		Alt string
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	promotion := model.Promotion{URL: req.URL, Alt: req.Alt}

	result := loader.DB.Create(&promotion)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to add promotion",
		})
		return;
	}

	//response
	c.JSON(http.StatusOK, gin.H{
		"url" : req.URL,
		"alt" : req.Alt,
	})


}

func GetAllPromotions(c *gin.Context) {
	promotions := []model.Promotion{}
	loader.DB.Find(&promotions)
	c.JSON(200, &promotions)
}

func DeletePromotion(c *gin.Context) {
	var req struct{
		ID int
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	loader.DB.Delete(&model.Promotion{}, req.ID)
	c.JSON(200,"Sucessfully Deleted Promotion")

}