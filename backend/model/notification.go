package model

import "gorm.io/gorm"

type Notification struct {
	gorm.Model
	UserID  int
	Content string
}