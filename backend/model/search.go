package model

import "gorm.io/gorm"

type SearchQuery struct {
	gorm.Model
	Email           string
	Keyword         string
	InnerKeyword    string
	IsAvailableOnly bool
}
