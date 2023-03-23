package model

import "gorm.io/gorm"

type Shop struct {
	gorm.Model
	Name string
	Email string `gorm:"unique"`
	Password string
	Description string
	Status string `gorm:"default:Active"`
	Image string 
	RoleID int `gorm:"default:2"`
}

type Review struct{
	gorm.Model	
	UserID         int
	TransactionDetailID  int
	Rating         int
	Detail        string
	CountHelpful   int
	CountUnhelpful int
}