package model

import "gorm.io/gorm"

type ShopRating struct {
	gorm.Model
	ShopID int
	UserID int
	Rating float64
}