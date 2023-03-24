package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/lowkeyy420/oldegg/loader"
	"github.com/lowkeyy420/oldegg/model"
)

func GetPaymentMethod(c *gin.Context) {
	var paymentMethods []model.PaymentMethod
	loader.DB.Model(model.PaymentMethod{}).Find(&paymentMethods)
	c.JSON(http.StatusOK, paymentMethods)
}

func GetDeliveryType(c *gin.Context) {
	var deliveryType []model.DeliveryType
	loader.DB.Model(model.DeliveryType{}).Find(&deliveryType)
	c.JSON(http.StatusOK, deliveryType)

}


func CreateTransaction(c *gin.Context) {
	var req struct {
		AddressID		int
		DeliveryTypeID	int
		PaymentMethodID int
		UserID			int
	}


	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	var user model.User
	loader.DB.Model(model.User{}).Where("id = ?", req.UserID).First(&user)

	if user.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "User not found",
		})
		return;
	}


	var address model.Address
	loader.DB.Model(model.Address{}).Where("id = ? AND user_id = ?", req.AddressID, user.ID).First(&address)
	
	if address.ID == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Please select a valid address",
		})
		return;
	}

	//check method of payment

	var carts []model.Cart
	loader.DB.Model(model.Cart{}).Where("user_id = ?", user.ID).Find(&carts)	
	totalPrice := 0
	length := len(carts)


	if length < 1{
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Please add some products",
		})
		return;
	}

	for i := 0; i < length; i++ {
		var product model.Product
		loader.DB.Model(model.Product{}).Where("id = ?", carts[i].ProductID).First(&product)
		totalPrice += product.Price * carts[i].Quantity
	}

	if req.PaymentMethodID == 1 {

		if totalPrice > user.Balance {
			c.JSON(http.StatusBadRequest, gin.H{
				"error": "Not enough balance",
			})
			return;
		}

		user.Balance -= totalPrice
		loader.DB.Save(&user)
	}

	// TH
	var header model.TransactionHeader

	header.AddressID = int(address.ID)
	header.DeliveryTypeID = req.DeliveryTypeID
	header.PaymentMethodID = req.PaymentMethodID
	header.UserID = int(user.ID)

	loader.DB.Model(model.TransactionHeader{}).Create(&header)

	// TD
	for i := 0; i < length; i++ {
		var transaction model.TransactionDetail
		transaction.TransactionHeaderID = int(header.ID)
		transaction.ProductID = carts[i].ProductID
		transaction.Quantity = carts[i].Quantity
		transaction.Status = "Ongoing"
		loader.DB.Model(model.TransactionDetail{}).Create(&transaction)
	}

	// Clear cart
	for i := 0; i < length; i++ {
		loader.DB.Model(model.Cart{}).Delete(&carts[i])
	}

	c.JSON(http.StatusOK, gin.H{
		"message"  : "Successfully Ordered",
	})
}



func GetShopTransactions(c *gin.Context) {

	var req struct {
		ShopID      int
		IsCancelled bool
		IsOngoing   bool
	}
	
	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	type ProductIDsByShopID struct {
		ID string
	}
	var productsByShopID []ProductIDsByShopID

	loader.DB.Model(model.Product{}).Where("shop_id = ?", req.ShopID).Find(&productsByShopID)

	length := len(productsByShopID)
	var productIDs []string
	for i := 0; i < length; i++ {
		productIDs = append(productIDs, productsByShopID[i].ID)
	}

	var transactions []model.TransactionDetail

	if req.IsOngoing {

		var temp []model.TransactionDetail
		loader.DB.Model(model.TransactionDetail{}).Where("product_id IN ?", productIDs).Where("status = ?", "Ongoing").Find(&temp)
		transactions = append(transactions, temp...)

	}

	if req.IsCancelled {

		var temp []model.TransactionDetail
		loader.DB.Model(model.TransactionDetail{}).Where("product_id IN ?", productIDs).Where("status = ?", "Cancelled").Find(&temp)
		transactions = append(transactions, temp...)

	} 
	

	type Response struct {
		Header  model.TransactionHeader 
		Detail  model.TransactionDetail 
		Address model.Address     
	}
	var responses []Response

	length = len(transactions)
	for i := 0; i < length; i++ {

		var response Response
		response.Detail = transactions[i]
		loader.DB.Model(model.TransactionHeader{}).Where("id = ?", response.Detail.TransactionHeaderID).First(&response.Header)
		loader.DB.Model(model.Address{}).Where("id = ?", response.Header.AddressID).First(&response.Address)
		responses = append(responses, response)
	}

	c.JSON(http.StatusOK, responses)
}

func MarkTransactionAsFinished(c *gin.Context) {

	var req struct {
		TransactionDetailID int
	}
	
	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	var transactionDetail model.TransactionDetail
	loader.DB.Model(model.TransactionDetail{}).Where("id = ?", req.TransactionDetailID).First(&transactionDetail)
	transactionDetail.Status = "Finished"
	loader.DB.Save(&transactionDetail)

	c.JSON(http.StatusOK, gin.H{
		"message"  : "Successfully mark as finished",
	})

}

func GetUserTransactions(c *gin.Context) {

	var req struct {
		UserID      int
		IsOngoing   bool   
		IsCancelled bool   
		Keyword     string 
		TransactionNumber string 
		TransactionDate   string
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}
	var transactionHeaders []model.TransactionHeader

	loader.DB.Model(model.TransactionHeader{}).Where("user_id = ?", req.UserID).Where("CAST(id AS VARCHAR) ILIKE ?", "%" +req.TransactionNumber+ "%").Find(&transactionHeaders)
	type Response struct {
		Header  model.TransactionHeader
		Detail  model.TransactionDetail
		Product model.Product
	}

	var responses []Response
	length := len(transactionHeaders)
	for i := 0; i < length; i++ {

		var details []model.TransactionDetail

		if req.IsOngoing {

			var temp []model.TransactionDetail
			loader.DB.Model(model.TransactionDetail{}).Where("transaction_header_id = ?", transactionHeaders[i].ID).Where("status = ?", "Ongoing").Find(&temp)

			detailLength := len(temp)

			var withKeyword []model.TransactionDetail
			for j := 0; j < detailLength; j++ {

				var product model.Product
				loader.DB.Model(model.Product{}).Where("id = ?", temp[j].ProductID).Where("name ILIKE ?", "%"+req.Keyword+"%").First(&product)

				if product.ID == 0 {
					continue
				}

				withKeyword = append(withKeyword, temp[j])

			}

			details = append(details, withKeyword...)

		}

		if req.IsCancelled {

			var temp []model.TransactionDetail
			loader.DB.Model(model.TransactionDetail{}).Where("transaction_header_id = ?", transactionHeaders[i].ID).Where("status = ?", "Cancelled").Find(&temp)

			detailLength := len(temp)
			var withKeyword []model.TransactionDetail
			for j := 0; j < detailLength; j++ {

				var product model.Product
				loader.DB.Model(model.Product{}).Where("id = ?", temp[j].ProductID).Where("name ILIKE ?", "%"+req.Keyword+"%").First(&product)

				if product.ID == 0 {
					continue
				}

				withKeyword = append(withKeyword, temp[j])

			}

			details = append(details, withKeyword...)

		}

		detailsLength := len(details)

		for j := 0; j < detailsLength; j++ {
			var response Response
			response.Header = transactionHeaders[i]
			response.Detail = details[j]
			loader.DB.Model(model.Product{}).Where("id = ?", details[j].ProductID).First(&response.Product)

			if req.TransactionDate == "" {

				responses = append(responses, response)

			} else {

				if response.Header.CreatedAt.String()[:10] == req.TransactionDate {

					responses = append(responses, response)

				}

			}

		}

	}

	c.JSON(http.StatusOK, responses)

}
