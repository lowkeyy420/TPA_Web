package model

import "gorm.io/gorm"

type Shop struct {
	gorm.Model
	ShopName string
	ShopEmail string `gorm:"unique"`
	ShopPassword string
	ShopDescription string
	Status string
	Rating int
}