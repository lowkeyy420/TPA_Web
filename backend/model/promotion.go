package model

import "gorm.io/gorm"

type Promotion struct {
	gorm.Model
	URL string
	Alt string
}