package model

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	StoreID             int
	ProductCategoryID  int 
	Name        string
	Description string
	Price  	   int
	Stock       int
	Details     string
}