package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	First_name string
	Last_name string
	Email string `gorm:"unique"`
	Phone string `gorm:"default:-"`;
	Password string
	RoleID int `gorm:"default:1"`
	SubscribeToEmail bool
	Status string `gorm:"default:Active"`
	Balance int `gorm:"default:0"`
}