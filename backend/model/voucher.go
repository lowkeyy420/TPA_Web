package model

import "gorm.io/gorm"

type Voucher struct {
	gorm.Model
	VoucherCode        string `json:"voucher_code" gorm:"primary_key"`
	VoucherDiscount    int64  `json:"voucher_discount"`
	VoucherDescription string `json:"voucher_description"`
}
