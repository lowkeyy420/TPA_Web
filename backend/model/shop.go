package model

import "gorm.io/gorm"

type Shop struct {
	gorm.Model
	ShopName     string `json:"shop_name"`
	ShopEmail    string `json:"shop_email"`
	ShopPassword string `json:"shop_password"`
	Status       string `json:"status"`
}
