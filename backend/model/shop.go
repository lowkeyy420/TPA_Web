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