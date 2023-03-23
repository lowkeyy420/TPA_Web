package route

import (
	"github.com/gin-gonic/gin"
	"github.com/lowkeyy420/oldegg/controller"
	"github.com/lowkeyy420/oldegg/middleware"
)

func UserRoute(r *gin.Engine) {
	r.POST("/getuser", controller.GetUser )
	r.POST("/signup", controller.SignUp )
	r.POST("/login", controller.Login )
	r.POST("/get-otc", controller.GetOneTimeSignInCode )
	r.POST("/login-otc", controller.SignInWithOneTimeCode )
	
	r.POST("/get-forgotpassword-otc", controller.RequestForgotPassword )
	r.POST("/login-forgotpassword-otc", controller.SignInForgoPasswordCode )

	r.GET("/get-address", middleware.RequireAuth, controller.GetUserAddress)
	r.GET("/get-notification", middleware.RequireAuth, controller.GetUserNotification)
	r.POST("/subscribe-email", middleware.RequireAuth, controller.SubscribeToEmail)
	
	
	r.POST("/save-query", controller.SaveQuery)
	r.GET("/get-popular-query", controller.GetPopularQueries)


	r.POST("/change-password", controller.ChangeUserPassword)
	r.POST("/update-phone", controller.UpdatePhoneNumber)
	r.POST("/enable-2FA", controller.Enable2FA)


	r.GET("/get-cart", controller.GetCartPrice)
}

func ShopRoute(r *gin.Engine){
	r.GET("/shop/get-all-shop",  controller.GetAllShop)
	r.GET("/shop/get-shop", controller.GetShopById)
	r.POST("/shop/update-shop", middleware.RequireAuth,controller.UpdateShopInfo)
	r.POST("/shop/change-password",middleware.RequireAuth, controller.ChangeShopPassword)
	r.POST("/shop/get-review",middleware.RequireAuth, controller.GetShopReviews)
	r.POST("/shop/get-top-shop",middleware.RequireAuth, controller.GetTopShops)
	r.GET("/shop/get-top-three", controller.GetTop3Shop)


	r.GET("/shop/get-recommended", controller.GetShopRecommended)

}

func ProductRoute(r *gin.Engine){
	r.GET("/product/get", controller.GetProductsByShopID)
	r.GET("/product/get-item", controller.GetProductByID)


	r.GET("/product/get-categories", controller.GetCategories)
	r.POST("/product/insert-new-product", middleware.RequireAuth, controller.AddProduct)
	r.POST("/product/update-product", middleware.RequireAuth, controller.UpdateProduct)
	r.POST("/product/remove-product", middleware.RequireAuth, controller.DeleteProduct)
	r.GET("/product/get-recommended", controller.GetRecommendedProducts)
	r.POST("/product/search", controller.SearchProduct)
	r.GET("/product/popular-categories", controller.GetPopularCategories)



	r.GET("/product/frequently-bought", controller.GetFrequentlyBoughtWithProducts)
	r.GET("/product/similar-product", controller.GetSimilarProducts)

}

func PromotionRoute(r *gin.Engine){
	r.GET("/promotion/get-all-promotion",  controller.GetAllPromotions)
}

func VoucherRoute(r *gin.Engine){
	r.GET("/voucher-info", controller.GetVoucherByCode)
	r.POST("/use-voucher", middleware.RequireAuth, controller.UseVoucher )
}

func TransactionRoute(r *gin.Engine){
	r.POST("/product/add-to-cart", controller.AddToCart)
	r.GET("/product/get-cart-item", controller.GetItemsInCart)
	r.POST("/product/update-cart", controller.UpdateItemsInCart)
	r.POST("/product/remove-from-cart", controller.RemoveItemsInCart)
}

func AdminRoute(r *gin.Engine){
	//user
	r.GET("/admin/get-all-user", middleware.AdminAuth, controller.GetAllUser )
	r.PUT("/admin/update-user-status", middleware.AdminAuth, controller.UpdateUserStatus)
	

	//promotion
	r.POST("/promotion/insert-new-promotion", middleware.AdminAuth, controller.AddPromotion)
	r.POST("/promotion/remove-promotion", middleware.AdminAuth, controller.DeletePromotion)


	//voucher
	r.POST("/admin/add-voucher", middleware.AdminAuth, controller.AddVoucher )
	r.GET("/admin/get-all-voucher", middleware.AdminAuth, controller.GetAllVoucher )
	r.POST("/admin/update-voucher", middleware.AdminAuth, controller.UpdateVoucher)
	
	//shop
	r.POST("/admin/add-shop", middleware.AdminAuth, controller.CreateShop)
	r.POST("/admin/notify-created-shop", middleware.AdminAuth, controller.NotifyCreatedShop )
	r.PUT("/admin/update-shop-status", middleware.AdminAuth, controller.UpdateShopStatus)
	r.GET("/shop/get-active-shop",  middleware.AdminAuth,controller.GetShopByActive)
	r.GET("/shop/get-banned-shop",  middleware.AdminAuth,controller.GetShopByBanned)
	
	//etc
	r.POST("/admin/send-email-to-subscriber", middleware.AdminAuth, controller.SendNewsToSubcriber)
	r.GET("/admin/get-customer-service-review", middleware.AdminAuth, controller.GetCustomerServiceReview )

	//visualization
	r.GET("/admin/get-visualization", middleware.AdminAuth, controller.GetVisualizationData )
}

func ChatRoute(r *gin.Engine){
	r.GET("/message", middleware.RequireAuth ,controller.SendMessage)
}




func UseAllRoutes(r *gin.Engine){
	UserRoute(r)
	ShopRoute(r)
	ProductRoute(r)
	PromotionRoute(r)
	VoucherRoute(r)
	TransactionRoute(r)
	AdminRoute(r)
	ChatRoute(r)
}