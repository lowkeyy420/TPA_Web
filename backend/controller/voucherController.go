package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lowkeyy420/oldegg/loader"
	"github.com/lowkeyy420/oldegg/model"
)

func AddVoucher(c *gin.Context) {
	var req struct{
		Code		string
		Balance		int
		Description	string
		Count		int 
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	voucher := model.Voucher{Code: req.Code, Balance: req.Balance, Description: req.Description, Count: req.Count}

	result := loader.DB.Create(&voucher)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create voucher",
		})
		return;
	}

	//response
	c.JSON(http.StatusOK, gin.H{
		"data" : voucher,
	})

}


func GetAllVoucher(c *gin.Context) {
	var vouchers []model.Voucher
	loader.DB.Find(&vouchers)
	c.JSON(http.StatusOK, gin.H{
		"data" : vouchers,
	})
}


func GetVoucherByCode(c *gin.Context) {
	code := c.Query("code")

	var voucher model.Voucher

	if code != "" {
		loader.DB.Model(model.Voucher{}).Where("code = ?", code).First(&voucher)
	} else {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "please input voucher code",
		})
		return;
	}

	if voucher.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "No Voucher Found",
		})
		return;
	}
	
	c.JSON(http.StatusOK, gin.H{
		"data" : voucher,
	})

}

func UseVoucher(c *gin.Context) {
	var req struct{
		Email	string
		Code	string
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	var voucher model.Voucher

	loader.DB.Model(model.Voucher{}).Where("code = ?", req.Code).First(&voucher)

	if voucher.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "No Voucher Found!",
		})
		return;
		
	}
	if voucher.Count < 1 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Voucher limit exceeded!",
		})
		return;
	}

	//set user balance with voucher value
	var user model.User

	loader.DB.Model(model.User{}).Where("email = ?", req.Email).First(&user)

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "No User Found!",
		})
		return;
	}

	user.Balance += voucher.Balance
	loader.DB.Save(&user)

	//decrease voucher avaibility count
	voucher.Count -= 1
	loader.DB.Save(&voucher)

	c.JSON(http.StatusOK, gin.H{
		"message" : "Successfuly Used Voucher",
	})

}


func UpdateVoucher(c *gin.Context){
	var req struct{
		ID			int
		Balance		int
		Description	string
		Count		int 
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	var voucher model.Voucher

	loader.DB.Model(model.Voucher{}).Where("id = ?", req.ID).First(&voucher)

	if voucher.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "No Voucher Found!",
		})
		return;
	}

	voucher.Balance = req.Balance
	voucher.Description = req.Description
	voucher.Count = req.Count

	loader.DB.Save(&voucher)

	c.JSON(http.StatusOK, gin.H{
		"message" : "Successfuly Updated Voucher",
	})
}