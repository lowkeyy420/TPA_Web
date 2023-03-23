package controller

import "github.com/gin-gonic/gin"

func AddToCart(c *gin.Context){
	var req struct{
		UserID string
		ProductID string
		Quantity int
	}

	c.BindJSON(&req)

}