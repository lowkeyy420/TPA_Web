package model

import "gorm.io/gorm"

type CustomerReview struct {
	gorm.Model
	UserID	int
	Content     string
}