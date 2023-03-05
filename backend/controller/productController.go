package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lowkeyy420/oldegg/loader"
	"github.com/lowkeyy420/oldegg/model"
)

func AddProduct(c *gin.Context){
	var req struct{
		StoreID int
		ProductCategoryID int
		ProductName string
		ProductDescription string
		ProductPrice int
		ProductStock int
		ProductDetails string
	}

	if c.Bind(&req) != nil{
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	//check if store exists
	var store model.Shop
	loader.DB.First(&store, "id =?", req.StoreID)

	if store.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid Store",
		})
		return;
	}

	//check if category exists
	var category model.ProductCategory
	loader.DB.First(&category, "id =?", req.ProductCategoryID)

	if category.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid Category",
		})
		return;
	}


}