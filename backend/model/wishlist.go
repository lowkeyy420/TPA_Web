package model

import "gorm.io/gorm"

type Wishlist struct {
	gorm.Model
	UserID      int   
	Name 		string
	IsPublic    bool
	Description string
}


type WishlistInfo struct {
	gorm.Model
	WishlistID  int   
	ProductID	int
	Quantity    int
}