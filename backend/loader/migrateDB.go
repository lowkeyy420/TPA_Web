package loader

import "github.com/lowkeyy420/oldegg/model"

func SyncDatabase() {
	DB.AutoMigrate(&model.User{})
	DB.AutoMigrate(&model.Shop{})	
	DB.AutoMigrate(&model.ShopRating{})
	DB.AutoMigrate(&model.Address{})
	DB.AutoMigrate(&model.Message{})
	DB.AutoMigrate(&model.ProductCategory{})
	DB.AutoMigrate(&model.Product{})
	DB.AutoMigrate(&model.Voucher{})
	DB.AutoMigrate(&model.Promotion{})  
	DB.AutoMigrate(&model.CustomerReview{})  
	DB.AutoMigrate(&model.Notification{})  
}