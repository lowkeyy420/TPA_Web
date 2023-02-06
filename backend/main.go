package main

import (
	"context"
	"fmt"
	"io"
	"log"
	"net/http"

	"github.com/go-pg/pg"
)

func addUser(user User){

}

func handleRoot(writer http.ResponseWriter, req *http.Request){
	switch req.Method{
		case http.MethodGet:
			fmt.Fprintln(writer, "<h1>This from Go (GET)</h1>")
		case http.MethodPost:
			fmt.Fprintln(writer, "<h1>This from Go (POST)</h1>")
			bytes,err := io.ReadAll(req.Body);
			if err != nil{
				log.Fatal(err)
			}
			body := string(bytes);
			fmt.Fprintf(writer, "<p>%s</p>", body);		
			// addUser(body)
	}

}

type User struct{
	tableName struct{} `pg:"users"`

	UserId uint `pg:"users_id,pk"`
	Name string `pg:"name"`
	Email string `pg:"email"`
};


func main(){
	http.HandleFunc("/", handleRoot);

	err := http.ListenAndServe(":4321", nil);

	if err != nil {
		fmt.Println(err)
	}

	db := pg.Connect(&pg.Options{
		Addr:     ":5432",
		User:     "postgres",
		Password: "ciuliu",
		Database: "postgres",
	})

	ctx := context.Background()
	_, errCtx := db.ExecContext(ctx, "")
	if errCtx != nil {
		panic(errCtx)
	}

	// fmt.Println(result);
	
	// resultShow := result.RowsAffected();
	
	// fmt.Println(resultShow);

	// var users []User
	// err = db.Model(&users).Select()
	// if err != nil{
	// 	panic(err)
	// }

	// fmt.Println(users)

	//INSERT
	// var user = User{
	// 	Name : "Joseph",
	// 	Email : "joseph@gmail.com",
	// }

	// db.Model(&user).Insert();

	// fmt.Println(user);


	//UPDATE
	// var updateUser = User{
	// 	UserId : 2,
	// 	Name : "Bob",
	// 	Email : "bob@gmail.com",
	// }

	// _,err = db.Model(&updateUser).
	// 	Where("user_id = ?", updateUser.UserId).
	// 	Update()

	// if err != nil {
	// 	panic(err)
	// }

	// fmt.Println(updateUser);


	//DELETE
	// _,err = db.Model(&User{}).Where("user_id = ?", 2).Delete();

	// if err != nil{
	// 	panic(err)
	// }
	
}