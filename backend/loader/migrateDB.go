package loader

import "github.com/lowkeyy420/oldegg/model"

func SyncDatabase() {
	DB.AutoMigrate(&model.User{})
	DB.AutoMigrate(&model.Product{})
	DB.AutoMigrate(&model.ProductCategory{})
	DB.AutoMigrate(&model.Store{})
	DB.AutoMigrate(&model.Voucher{})
	DB.AutoMigrate(&model.Message{})
}