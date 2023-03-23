package controller

import (
	"fmt"
	"math"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/lowkeyy420/oldegg/loader"
	"github.com/lowkeyy420/oldegg/model"
)

func AddProduct(c *gin.Context){
	var req struct{
		ShopID				int
		ProductCategoryID	int 
		Name				string
		Image				string
		Description			string
		Price				int
		Stock				int
		Details				string
	}

	user,_ := c.Get("user")

	fmt.Println(user)

	if c.Bind(&req) != nil{
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	//check if store exists
	var store model.Shop
	loader.DB.First(&store, "id =?", req.ShopID)

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


func GetProductsByShopID (c *gin.Context){
	find := c.Query("id")
	var shop model.Shop

	result := loader.DB.First(&shop, find)

	id, err := strconv.Atoi(c.Query("id"))

	fmt.Println("query id ", find)
	fmt.Println("ID ", id)

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "no id included",
		})
		return
	}

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Shop not found",
		})
		return
	}

	if shop.Status == "Banned"{
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "User Banned",
		})
		return
	
	}

	page, err := strconv.Atoi(c.Query("page"))
	if err != nil || page < 1 {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "Invalid page number",
		})
		return
	}

	var count int64
	loader.DB.Model(&model.Product{}).Where("shop_id = ?", id).Count(&count)

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

	var products []model.Product
	loader.DB.Where("store_id = ?", id).Offset(offset).Order("id").Limit(limit).Find(&products)

	c.JSON(http.StatusOK, gin.H{
		"data":  products,
		"count": count,
	})



}