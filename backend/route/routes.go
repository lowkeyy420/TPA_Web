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

func ProductRoute(r *gin.Engine){
	r.GET("/product/get", controller.GetUser )
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
}

func ChatRoute(r *gin.Engine){
	r.GET("/message", middleware.RequireAuth ,controller.SendMessage)
}




func UseAllRoutes(r *gin.Engine){
	UserRoute(r)
	ProductRoute(r)
	PromotionRoute(r)
	AdminRoute(r)
	ChatRoute(r)
}