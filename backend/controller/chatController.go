package controller

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"github.com/lowkeyy420/oldegg/loader"
	"github.com/lowkeyy420/oldegg/model"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

var conns = map[string]*websocket.Conn{}

func GetAllMSg(c *gin.Context) {
	var req struct {
		SenderID string
		RecipientID   string
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	msg1 := []model.Message{}
	msg2 := []model.Message{}

	loader.DB.Where("sender_id = ?", req.SenderID).Where("recipient_id = ?", req.RecipientID).Find(&msg1)
	loader.DB.Where("sender_id = ?", req.RecipientID).Where("recipient_id= ?", req.SenderID).Find(&msg2)

	c.JSON(200, gin.H{
		"user1": msg1,
		"user2": msg2,
	})

	return
}

func GetAllShopMsg(c *gin.Context) {
	var req struct {
		SenderID string 
		RecipientID   string 
	}

	if c.Bind(&req) != nil {
	c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	msg1 := []model.Message{}
	msg2 := []model.Message{}

	loader.DB.Where("sender_id = ?", req.SenderID).Where("recipient_id = ?", req.RecipientID).Where("type = ?", "shop").Find(&msg1)
	loader.DB.Where("sender_id = ?", req.RecipientID).Where("recipient_id= ?", req.SenderID).Where("type = ?", "shop").Find(&msg2)
	c.JSON(200, gin.H{
		"user1": msg1,
		"user2": msg2,
	})
	return
}

func SendMessage(c *gin.Context) {
	var ReqSenderID string
	h := http.Header{}

	fmt.Println("connected")
	fmt.Println(h)


	for _, sub := range websocket.Subprotocols(c.Request) {
		h.Set("Sec-Websocket-Protocol", sub)
		// fmt.Println(sub)
		ReqSenderID = sub
		// fmt.Println(sub)
	}

	ws, err := upgrader.Upgrade(c.Writer, c.Request, h)

	if err != nil {
		fmt.Println(err)
	}
	conns[ReqSenderID] = ws
	
	for {
		var req model.Message
		err = ws.ReadJSON(&req)

		if req.SenderID != "" {
			loader.DB.Create(&req)
		}

		conns[req.SenderID] = ws

		if con, ok := conns[req.RecipientID]; ok {
			err = con.WriteJSON(&req)
		if err != nil {
			fmt.Println(err)
		}
		}
		if con, ok := conns[req.SenderID]; ok {
			err = con.WriteJSON(&req)
			if err != nil {
				fmt.Println(err)
			}
		}

	}
}

func GetAllMsg(c *gin.Context){
	messages := []model.Message{}
	loader.DB.Find(&messages)
	c.JSON(200,&messages)
}