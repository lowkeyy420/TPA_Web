package loader

import "github.com/lowkeyy420/oldegg/model"

func SyncDatabase() {
	DB.AutoMigrate(&model.User{})
}