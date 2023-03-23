package model

import "gorm.io/gorm"

type Cart struct {
	gorm.Model
	UserID    int   
	ProductID int
	Quantity  int
}
