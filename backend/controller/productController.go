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


	product := model.Product{ShopID: req.ShopID,ProductCategoryID: req.ProductCategoryID,Name: req.Name,Image: req.Image,Description: req.Description,Price: req.Price,Stock: req.Stock,Details: req.Details,
	}
	result := loader.DB.Create(&product)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to add product",
		})
		return;
	}

	//response
	c.JSON(http.StatusOK, gin.H{
		"message" : "Success adding product",
	})

	



}


func UpdateProduct(c *gin.Context){
	var req struct{
		ID					int
		ShopID				int
		ProductCategoryID	int 
		Name				string
		Image				string
		Description			string
		Price				int
		Stock				int
		Details				string
	}


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
	
	var product model.Product
	loader.DB.Where("id = ? AND shop_id = ?", req.ID, req.ShopID).First(&product)

	if product.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid Product",
		})
		return;
	}

	product.ProductCategoryID = req.ProductCategoryID
	product.Name = req.Name
	product.Image = req.Image
	product.Description = req.Description
	product.Price = req.Price
	product.Stock = req.Stock
	product.Details = req.Details


	if err := loader.DB.Save(&product).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update product",
		})
		return
	}

	c.JSON(http.StatusOK, req)
}



func GetProductsByShopID (c *gin.Context){
	find := c.Query("id")
	var shop model.Shop

	result := loader.DB.First(&shop, find)

	id, err := strconv.Atoi(c.Query("id"))

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
	loader.DB.Joins("JOIN product_categories PC ON PC.id = products.product_category_id").
	Where("store_id = ?", id).Offset(offset).Order("id").Limit(limit).Find(&products)

	c.JSON(http.StatusOK, gin.H{
		"data":  products,
		"count": count,
	})

}

func DeleteProduct(c *gin.Context){
	var req struct {
		ID	int
		ShopID int
	}

	var product model.Product
	loader.DB.Where("id = ? AND shop_id = ?", req.ID, req.ShopID).First(&product)

	loader.DB.Delete(&product)

	c.JSON(http.StatusOK, gin.H{
		"message" : "Successfuly Deleted",
	})
}

func GetCategories(c *gin.Context){
	var categories []model.ProductCategory
	loader.DB.Model(model.ProductCategory{}).Find(&categories)

	c.JSON(http.StatusOK, gin.H{
		"data" : categories,
	})
}