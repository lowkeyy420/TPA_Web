package model

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	StoreID             int
	ProductCategoryID  int 
	ProductName        string
	ProductDescription string
	ProductPrice  	   int
	ProductStock       int
	ProductDetails     string
}