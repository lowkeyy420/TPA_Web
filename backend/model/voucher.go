package model

import "gorm.io/gorm"

type Voucher struct {
	gorm.Model
	VoucherCode        string `gorm:"unique"`
	VoucherDiscount    int64 
	VoucherDescription string
	VoucherCount int 
}
