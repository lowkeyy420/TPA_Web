package model

import "gorm.io/gorm"

type CustomerReview struct {
	gorm.Model
	UserID	int
	Content     string
}


type ProductReview struct {
	gorm.Model
	UserID         int
	OrderDetailID  int
	Rating         int
	Details        string
	CountHelpful   int
	CountUnhelpful int
}
