package model

import "gorm.io/gorm"

type TransactionHeader struct {
	gorm.Model
	AddressID          int
	DeliveryTypeID int
	PaymentMethodID    int
	UserID             int
}

type TransactionDetail struct {
	gorm.Model
	TransactionHeaderID	int
	ProductID		int
	quantity		int
	Status			string
}

