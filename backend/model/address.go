package model

import "gorm.io/gorm"

type Address struct {
	gorm.Model
	UserID  int
	Address string
}