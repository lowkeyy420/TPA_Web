package model

import "gorm.io/gorm"

type Role struct {
	gorm.Model
	RoleID   int    `gorm:"primary_key"`
	RoleName string
}
