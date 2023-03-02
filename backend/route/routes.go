package route

import (
	"github.com/gin-gonic/gin"
	"github.com/lowkeyy420/oldegg/controller"
)

func UserRoute(r *gin.Engine) {
	r.POST("/getuser", controller.GetUser )
	r.POST("/signup", controller.SignUp )
	r.POST("/login", controller.Login )
}


func ProductRoute(r *gin.Engine){
	r.POST("/addproduct", controller.GetUser )
	r.POST("/removeproduct", controller.SignUp )
	r.POST("/updateproduct", controller.Login )
}

func ChatRoute(r *gin.Engine){
	r.GET("/api/v1/message", controller.SendMessage)
}


func UseAllRoutes(r *gin.Engine){
	UserRoute(r)
}