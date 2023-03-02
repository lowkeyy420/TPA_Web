package model

import "gorm.io/gorm"

type Message struct {
	gorm.Model
	SenderID    string
	RecipientID string
	Message     string
}