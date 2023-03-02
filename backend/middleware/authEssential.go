package middleware

import (
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"github.com/lowkeyy420/oldegg/loader"
	"github.com/lowkeyy420/oldegg/model"
)

func RequireAuth(c *gin.Context) {
	//get token
	// tokenString, err := c.Cookie("Authorization")
	header := c.Request.Header.Get("Authorization")
	if len(header) <= 7 {
		c.AbortWithStatus(http.StatusUnauthorized)
		return;
	}

	fmt.Println("auth : " + header)
	tokenString := header[7:]
	
	
	// if err != nil {
		// fmt.Println(err)
		// c.AbortWithStatus(http.StatusUnauthorized)
	// }

	
	//validate token
	token,_ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
	
		return []byte(os.Getenv("SECRET")), nil
	})
	
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		//validate expiration
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}
		
		//find user with token subject
		var user model.User
		loader.DB.First(&user, claims["sbj"])
		
		if user.ID == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		//attach to request
		c.Set("user", user)

		//continue
		c.Next()

	} else {
		c.AbortWithStatus(http.StatusUnauthorized)
	}

}


func AdminAuth(c *gin.Context) {
	//get token
	// tokenString, err := c.Cookie("Authorization")
	header := c.Request.Header.Get("Authorization")
	if len(header) <= 7 {
		c.AbortWithStatus(http.StatusUnauthorized)
		return;
	}

	tokenString := header[7:]
	
	//validate token
	token,_ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(os.Getenv("SECRET")), nil
	})
	
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		//validate expiration
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}
		
		//find user with token subject
		var user model.User
		loader.DB.First(&user, claims["sbj"])
		
		if user.ID == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		if user.RoleID != 4 {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		//attach to request
		c.Set("user", user)

		//continue
		c.Next()

	} else {
		c.AbortWithStatus(http.StatusUnauthorized)
	}

}
