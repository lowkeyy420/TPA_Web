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

	user, exists := c.Get("user")
	if !exists {
		return;
	}
	currentUserID := user.(model.Shop).ID

	if store.ID != currentUserID {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "You are not this shop owner!",
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


	user, exists := c.Get("user")
	if !exists {
		return;
	}
	currentUserID := user.(model.Shop).ID

	if store.ID != currentUserID {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "You are not this shop owner!",
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

	PRODUCT_PER_PAGE := 50

	offset := (page - 1) * PRODUCT_PER_PAGE
	limit := PRODUCT_PER_PAGE

	max := int(math.Ceil(float64(count) / float64(limit)))

	fmt.Println("max ", max, " page ", page)

	if page > max {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "Invalid page number",
		})
		return
	}

	type ProductWithCategory struct {
		ID					int
		ShopID             int
		ProductCategoryID  int 
		Name               string
		Image              string
		Description        string
		Price              int
		Stock              int
		Details            string
		ProductCategoryName string
	}

	var products []ProductWithCategory
	
	if err := loader.DB.Table("products").Select("products.*, product_categories.product_category_name as product_category_name").Joins("JOIN product_categories ON products.product_category_id = product_categories.id").Where("products.shop_id = ?", id).Offset(offset).Order("id").Limit(limit).Find(&products).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "Error occured",
		})
		return;
	}

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


func GetRecommendedProducts(c *gin.Context){

	page, err := strconv.Atoi(c.Query("page"))
	if err != nil || page < 1 {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "Invalid page number",
		})
		return
	}

	var count int64
	loader.DB.Model(&model.Product{}).Count(&count)

	
	offset := (page - 1) * loader.ITEM_PER_PAGE
	limit := loader.ITEM_PER_PAGE

	max := int(math.Ceil(float64(count) / float64(limit)))

	if page > max {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "Invalid page number",
		})
		return
	}

	type ProductWithCategory struct {
		ID					int
		ShopID             int
		ProductCategoryID  int 
		Name               string
		Image              string
		Description        string
		Price              int
		Stock              int
		Details            string
		ProductCategoryName string
	}

	var products []ProductWithCategory
	
	if err := loader.DB.Table("products").Select("products.*, product_categories.product_category_name as product_category_name").Joins("JOIN product_categories ON products.product_category_id = product_categories.id").Offset(offset).Order("products.stock DESC").Limit(limit).Find(&products).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "Error occured",
		})
		return;
	}

	c.JSON(http.StatusOK, gin.H{
		"data":  products,
		"count": count,
	})

}



func SearchProduct(c *gin.Context){
	var req struct {
		Keyword         string
		InnerKeyword    string
		IsAvailableOnly bool  
	}

	if c.Bind(&req) != nil{
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}


	page, err := strconv.Atoi(c.Query("page"))
	if err != nil || page < 1 {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "Invalid page number",
		})
		return
	}

	var count int64
	
	offset := (page - 1) * loader.ITEM_PER_PAGE
	limit := loader.ITEM_PER_PAGE
	
	products := []model.Product{}

	if req.IsAvailableOnly {
		loader.DB.Model(model.Product{}).Where("name ILIKE ?", "%"+req.Keyword+"%").Where("name ILIKE ?", "%"+req.InnerKeyword+"%").Where("stock > 0").Limit(limit).Offset(offset).Find(&products)
		loader.DB.Model(&model.Product{}).Where("name ILIKE ?", "%"+req.Keyword+"%").Where("name ILIKE ?", "%"+req.InnerKeyword+"%").Where("stock > 0").Count(&count)

	} else {

		loader.DB.Model(model.Product{}).Where("name ILIKE ?", "%"+req.Keyword+"%").Where("name ILIKE ?", "%"+req.InnerKeyword+"%").Limit(limit).Offset(offset).Find(&products)
		loader.DB.Model(model.Product{}).Where("name ILIKE ?", "%"+req.Keyword+"%").Where("name ILIKE ?", "%"+req.InnerKeyword+"%").Count(&count)
	}

	if(count < 1){
		c.JSON(http.StatusOK, gin.H{
			"data": nil,
			"count": 0,
		})
	}

	
	c.JSON(http.StatusOK, gin.H{
		"data":  products,
		"count": count,
	})

}

func GetPopularCategories(c *gin.Context){
	var categories []model.ProductCategory

	loader.DB.Model(model.ProductCategory{}).Distinct("product_category_name").Offset(6).Limit(6).Find(&categories);

	c.JSON(http.StatusOK, gin.H{
		"data" : categories,
		"count" : 6,
	})
}

func GetProductByID(c *gin.Context){
	find := c.Query("id")
	var product model.Product

	result := loader.DB.First(&product, find)

	id, err := strconv.Atoi(c.Query("id"))

	if err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "no id included",
		})
		return
	}

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Product not found",
		})
		return
	}


	var shop model.Shop
	result = loader.DB.First(&shop, product.ShopID)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Shop owner not found",
		})
		return
	}

	if shop.Status == "Banned"{
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Banned",
		})
		return
	}

	type ProductWithCategory struct {
		ID					int
		ShopID             int
		ProductCategoryID  int 
		Name               string
		Image              string
		Description        string
		Price              int
		Stock              int
		Details            string
		ProductCategoryName string
	}

	var products ProductWithCategory
	
	if err := loader.DB.Table("products").Select("products.*, product_categories.product_category_name as product_category_name").Joins("JOIN product_categories ON products.product_category_id = product_categories.id").Where("products.id = ?", id).Find(&products).Error; err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"error": "Error occured",
		})
		return;
	}

	c.JSON(http.StatusOK, gin.H{
		"data":  products,
		"shop": shop,
	})

}