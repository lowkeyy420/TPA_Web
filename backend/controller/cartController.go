package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lowkeyy420/oldegg/loader"
	"github.com/lowkeyy420/oldegg/model"
)

func AddToCart(c *gin.Context){
	var req struct{
		UserID int
		ProductID int
		Quantity int
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	var entry model.Cart
	entry.UserID = req.UserID
	entry.ProductID = req.ProductID
	entry.Quantity = req.Quantity

	// If Exist Add, if not create
	var existingCart model.Cart
	loader.DB.Model(model.Cart{}).Where("user_id = ?", req.UserID).Where("product_id = ?", req.ProductID).First(&existingCart)

	var product model.Product
	loader.DB.Model(model.Product{}).Where("id = ?", req.ProductID).First(&product)

	if existingCart.ID == 0 {

		loader.DB.Model(model.Cart{}).Create(&entry)

	} else {

		if( existingCart.Quantity + req.Quantity > product.Stock) {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Product limit exceeded",
			})
			return;
		}

		existingCart.Quantity += req.Quantity
		loader.DB.Save(&existingCart)

	}

	
	c.JSON(http.StatusOK, gin.H{
		"message" : "Item Added Cart",
	})

}


func GetItemsInCart(c *gin.Context) {
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

	var carts []model.Cart
	loader.DB.Model(model.Cart{}).Where("user_id = ?", id).Find(&carts)

	type ResponseBody struct {
		UserID             int      
		ProductID          int
		Quantity           int      
		ShopID             int      
		ProductCategoryID  int      
		ProductName        string   
		ProductDescription string   
		ProductPrice       int
		ProductStock       int      
		ProductDetails     string
		ProductImage	   string   
		
	}

	var products []ResponseBody
	length := len(carts)

	for i := 0; i < length; i++ {
		var product model.Product
		loader.DB.Model(model.Product{}).Where("id = ?", carts[i].ProductID).First(&product)

		var response ResponseBody
		response.UserID = carts[i].UserID
		response.ProductID = carts[i].ProductID
		response.Quantity = carts[i].Quantity
		response.ShopID = product.ShopID
		response.ProductCategoryID = product.ProductCategoryID
		response.ProductName = product.Name
		response.ProductDescription = product.Description
		response.ProductPrice = product.Price
		response.ProductStock = product.Stock
		response.ProductDetails = product.Details
		response.ProductImage = product.Image

		
		products = append(products, response)

	}

	c.JSON(http.StatusOK, products)

}

func UpdateItemsInCart(c *gin.Context) {
	var req struct{
		UserID int
		ProductID int
		Quantity int
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	var cart model.Cart
	loader.DB.Model(model.Cart{}).Where("user_id = ?", req.UserID).Where("product_id = ?", req.ProductID).First(&cart)

	if cart.ID == 0{
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to find product",
		})
		return;
	}

	
	cart.Quantity = req.Quantity
	loader.DB.Save(&cart)

	c.JSON(http.StatusOK, gin.H{
		"message" : "Successfully Updated Cart",
	})

}


func RemoveItemsInCart(c *gin.Context) {
	var req struct{
		UserID int
		ProductID int
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	var cart model.Cart
	loader.DB.Model(model.Cart{}).Where("user_id = ?", req.UserID).Where("product_id = ?", req.ProductID).First(&cart)

	if cart.ID == 0{
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "failed to find product",
		})
		return;
	}

	loader.DB.Model(model.Cart{}).Delete(&cart);

	c.JSON(http.StatusOK, gin.H{
		"message" : "Successfully Removed Cart",
	})

}