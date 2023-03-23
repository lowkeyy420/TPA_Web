package model

import "gorm.io/gorm"

type OneTimeCode struct {
	gorm.Model
	Email string
	Code  string
}
