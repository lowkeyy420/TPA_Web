package main

import (
	"github.com/gin-gonic/gin"
	"github.com/lowkeyy420/oldegg/controller"
	"github.com/lowkeyy420/oldegg/loader"
	"github.com/lowkeyy420/oldegg/middleware"
	"github.com/lowkeyy420/oldegg/route"
)


func init(){
	loader.LoadEnvVariables()
	loader.ConnectDB()
	loader.SyncDatabase()
}

func main(){
	
	r := gin.Default()
	r.Use(middleware.SetCORSMiddleware())

	route.UserRoute(r)
	route.ChatRoute(r)

	r.GET("/test", middleware.RequireAuth,controller.Ping )
	r.Run() 
}