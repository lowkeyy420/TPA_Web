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
	DB.AutoMigrate(&model.TransactionHeader{})  
	DB.AutoMigrate(&model.TransactionDetail{})  
	DB.AutoMigrate(&model.Review{})  
	DB.AutoMigrate(&model.OneTimeCode{})  
	DB.AutoMigrate(&model.SearchQuery{})
	DB.AutoMigrate(&model.Cart{})
	DB.AutoMigrate(&model.Wishlist{})
	DB.AutoMigrate(&model.WishlistInfo{})
	DB.AutoMigrate(&model.SavedProduct{})
	
	DB.AutoMigrate(&model.PaymentMethod{})
	DB.AutoMigrate(&model.DeliveryType{})

	DB.AutoMigrate(&model.Follow{})

}