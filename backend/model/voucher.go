package model

import "gorm.io/gorm"

type Voucher struct {
	gorm.Model
	VoucherCode        string `gorm:"unique"`
	VoucherBalance    int
	VoucherDescription string
	VoucherCount int 
}
