package main

import (
	"github.com/gin-gonic/gin"
	"github.com/lowkeyy420/oldegg/controller"
	"github.com/lowkeyy420/oldegg/loader"
	"github.com/lowkeyy420/oldegg/middleware"
)


func init(){
	loader.LoadEnvVariables()
	loader.ConnectDB()
	loader.SyncDatabase()
}

func main(){
	
	r := gin.Default()
	r.POST("/signup", controller.SignUp )
	r.POST("/login", controller.Login )
	r.GET("/test", middleware.RequireAuth,controller.Ping )
	r.Run() // listen and serve on 0.0.0.0:8080
}