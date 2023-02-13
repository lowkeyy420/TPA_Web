package model

type Store struct {
	ID      int `gorm:"primary_key"`
	Name    string
	Product []Product
}