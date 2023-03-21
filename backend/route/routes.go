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
}

func ShopRoute(r *gin.Engine){
	r.GET("/shop/get-all-shop",  controller.GetAllShop)
	r.GET("/shop/get-shop", controller.GetShopById)
	
	r.GET("/shop/get-shop-rating", controller.GetShopById)

}

func ProductRoute(r *gin.Engine){
	r.GET("/product/get", )
	r.POST("/product/insert-new-product", middleware.RequireAuth,)
	r.POST("/product/update-product", middleware.RequireAuth, )
	r.POST("/product/remove-product", middleware.RequireAuth,)
}

func PromotionRoute(r *gin.Engine){
	r.POST("/promotion/insert-new-promotion", middleware.AdminAuth, controller.AddPromotion)
	r.POST("/promotion/remove-promotion", middleware.AdminAuth, controller.DeletePromotion)
	r.GET("/promotion/get-all-promotion",  controller.GetAllPromotions)
}



func AdminRoute(r *gin.Engine){
	//user
	r.GET("/admin/get-all-user", middleware.AdminAuth, controller.GetAllUser )
	r.PUT("/admin/update-user-status", middleware.AdminAuth, controller.UpdateUserStatus)
	
	//voucher
	r.POST("/admin/add-voucher", middleware.AdminAuth, )
	r.GET("/admin/get-all-voucher", middleware.AdminAuth, )
	r.POST("/admin/update-voucher", middleware.AdminAuth, )
	
	//shop
	r.POST("/admin/add-shop", middleware.AdminAuth, controller.CreateShop)
	r.POST("/admin/notify-created-shop", middleware.AdminAuth, controller.NotifyCreatedShop )
	r.PUT("/admin/update-shop-status", middleware.AdminAuth, controller.UpdateShopStatus)
	r.GET("/shop/get-active-shop",  middleware.AdminAuth,controller.GetShopByActive)
	r.GET("/shop/get-banned-shop",  middleware.AdminAuth,controller.GetShopByBanned)
	
	//etc
	r.POST("/admin/send-email-to-subscriber", middleware.AdminAuth, controller.SendNewsToSubcriber)
	r.GET("/admin/get-customer-service-review", middleware.AdminAuth, )
}

func ChatRoute(r *gin.Engine){
	r.GET("/message", middleware.RequireAuth ,controller.SendMessage)
}




func UseAllRoutes(r *gin.Engine){
	UserRoute(r)
	ShopRoute(r)
	ProductRoute(r)
	PromotionRoute(r)
	AdminRoute(r)
	ChatRoute(r)
}