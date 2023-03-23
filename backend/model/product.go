package model

import "gorm.io/gorm"

type Product struct {
	gorm.Model
	ShopID				int
	ProductCategoryID	int 
	Name				string
	Image				string
	Description			string
	Price				int
	Stock				int
	Details				string
}



type SavedProduct struct {
	gorm.Model
	UserID int
	ProductID int
	Quantity int
}