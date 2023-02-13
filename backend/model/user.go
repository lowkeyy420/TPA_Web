package model

import "gorm.io/gorm"

type User struct {
	gorm.Model
	First_name string
	LastName_name string
	Email string `gorm:"unique"`
	Phone string `gorm:"default:-"`;
	Password string
}