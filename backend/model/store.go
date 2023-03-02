package model

import "gorm.io/gorm"

type Store struct {
	gorm.Model
	StoreName string
	StoreEmail string `gorm:"unique"`
	StorePassword string
	StoreDescription string
	Status string

}