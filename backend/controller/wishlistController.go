package controller

import (
	"math"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/lowkeyy420/oldegg/loader"
	"github.com/lowkeyy420/oldegg/model"
)


func CreateNewWishlist(c *gin.Context) {
	var req struct {
		UserID      int   
		Name 		string
		IsPublic    bool
		Description string	
	}


	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	wishlist := model.Wishlist{UserID: req.UserID, Name: req.Name, IsPublic: req.IsPublic, Description: req.Description}

	
	result := loader.DB.Create(&wishlist)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create wishlist",
		})
		return;
	}

	//response
	c.JSON(http.StatusOK, gin.H{
		"message" : "Successfully created wishlist",
	})
}

func UpdateWishList(c *gin.Context) {
	var req struct {
		ID			int
		Name 		string
		IsPublic    bool
	}


	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	//validation only owner can update
	user, exists := c.Get("user")
	if !exists {
		return;
	}
	
	currentUserID := user.(model.Shop).ID

	var wishlist model.Wishlist
	loader.DB.First(&wishlist, "id =?", req.ID)

	if wishlist.UserID != int(currentUserID) {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Only owner of this wishlist can update",
		})
		return;
	}

	
	wishlist.Name = req.Name
	wishlist.IsPublic = req.IsPublic

	if err := loader.DB.Save(&wishlist).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Failed to update wishlist",
		})
		return
	}

	//response
	c.JSON(http.StatusOK, gin.H{
		"message" : "Successfully created wishlist",
	})
}

func GetWishlistByUserID(c *gin.Context) {
	//userid
	id := c.Query("id")
	var user model.User

	//check user exists
	result := loader.DB.First(&user, id)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found",
		})
		return
	}

	var wishlists []model.Wishlist
	loader.DB.Model(model.Wishlist{}).Where("user_id = ?", user.ID).Find(&wishlists)

	c.JSON(http.StatusOK, wishlists)
}

func GetWishlistWithProductsByUserID(c *gin.Context) {
	//userid
	id := c.Query("id")
	var user model.User

	//check user exists
	result := loader.DB.First(&user, id)

	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found",
		})
		return
	}

	var wishlists []model.Wishlist
	loader.DB.Model(model.Wishlist{}).Where("user_id = ?", user.ID).Find(&wishlists)

	type Response struct {
		Wishlist			model.Wishlist      
		Info			[]model.WishlistInfo
		Products		[]model.Product     
		PromoCount		int
	}

	//get all products based on wishlist
	var responses []Response

	length := len(wishlists)

	for i := 0; i < length; i++ {
		var response Response

		var info []model.WishlistInfo
		loader.DB.Model(model.WishlistInfo{}).Where("wishlist_id = ?", wishlists[i].ID).Find(&info)
		response.Wishlist = wishlists[i]
		response.Info = info
		response.PromoCount = 0

		infoLength := len(info)
		for j := 0; j < infoLength; j++ {
			var product model.Product
			loader.DB.Model(model.Product{}).Where("id = ?", info[j].ProductID)
			response.Products = append(response.Products, product)
		}
		responses = append(responses, response)
	}

	c.JSON(http.StatusOK, responses)
}

func AddProductToWishlist(c *gin.Context) {

	var req struct {
		WishlistID  int   
		ProductID	int
		Quantity    int
	}

	if c.Bind(&req) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return;
	}

	
	wishlist := model.WishlistInfo{WishlistID: req.WishlistID, ProductID: req.ProductID,Quantity: req.Quantity}

	result := loader.DB.Create(&wishlist)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to add item to wishlist",
		})
		return;
	}

	//response
	c.JSON(http.StatusOK, gin.H{
		"message" : "Successfully added item to wishlist",
	})

}


func GetAllPublicWishlists(c *gin.Context) {
    page, err := strconv.Atoi(c.Query("page"))
    if err != nil || page < 1 {
        page = 1;
        return
    }

    limit, err := strconv.Atoi(c.Query("limit"))
    if err != nil || limit < 1 {
        limit = 8;
        return
    }

	var count int64
	loader.DB.Model(&model.Wishlist{}).Where("is_public = ?", true).Count(&count)


	offset := (page - 1) *  limit

	max := int(math.Ceil(float64(count) / float64(limit)))

	if page >  max {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
            "error": "Invalid page number",
        })
        return
	}

	var wishlists []model.Wishlist
	loader.DB.Model(model.Wishlist{}).Where("is_public = ?", true).Offset(offset).Order("id").Limit(limit).Find(&wishlists)
	
	c.JSON(http.StatusOK, gin.H{
		"data" : wishlists,
		"count" : count,
	})

}
