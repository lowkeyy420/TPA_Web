package model

import "gorm.io/gorm"

type Voucher struct {
	gorm.Model
	Code		string `gorm:"unique"`
	Balance		int
	Description	string
	Count		int 
}
