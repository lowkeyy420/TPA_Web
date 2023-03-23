package model

import "gorm.io/gorm"

type Review struct {
	gorm.Model
	UserID         int   
	TransactionDetailID  int
	Rating         int    
	Details        string 
	CountHelpful   int    
	CountUnhelpful int    
}
