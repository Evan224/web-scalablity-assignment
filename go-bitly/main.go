package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"math/rand"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

// const (
// 	host     = "mouse.db.elephantsql.com"
// 	port     = 5432
// 	user     = "trrgswiz"
// 	password = "yozbvg2oM-QlnSKI7_n3K8vJ1cyb8qEW"
// 	dbname   = "trrgswiz"
// )

var (
	//get env variables
	host     = os.Getenv("PGHOST")
	port     = 5432
	user     = os.Getenv("PGUSER")
	password = os.Getenv("PGPASSWORD")
	dbname   = os.Getenv("PGDATABASE")
)

const charset = "abcdefghijklmnopqrstuvwxyz" +
	"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

var seededRand *rand.Rand = rand.New(
	rand.NewSource(time.Now().UnixNano()))

func StringWithCharset(length int, charset string) string {
	b := make([]byte, length)
	for i := range b {
		b[i] = charset[seededRand.Intn(len(charset))]
	}
	return string(b)
}

func RandomString(length int) string {
	return StringWithCharset(length, charset)
}

func main() {
	// print the env variables

	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	defer db.Close()
	SHORT := ""
	URL := ""

	router := gin.Default()
	router.SetFuncMap(template.FuncMap{
		"upper": strings.ToUpper,
	})
	router.Static("/assets", "./assets")
	router.LoadHTMLGlob("templates/*.html")

	router.GET("/random", func(c *gin.Context) {
		// get a random url from db
		fmt.Println("done?????????")
		var url string
		//get 1 random url
		err := db.QueryRow("SELECT url FROM urls ORDER BY RANDOM() LIMIT 1").Scan(&url)
		if err != nil {
			panic(err)
		}
		//response status 302
		c.Header("Cache-Control", "no-cache, no-store, must-revalidate")
		//302
		c.Redirect(http.StatusTemporaryRedirect, url)
	})

	router.GET("/", func(c *gin.Context) {
		// create the urls table (url, short_url)
		_, err = db.Exec("CREATE TABLE IF NOT EXISTS urls (url TEXT, short_url TEXT)")
		if err != nil {
			panic(err)
		}
		c.HTML(http.StatusOK, "index.html", gin.H{
			"content": "This is an index page...",
			"url":     URL,
			"short":   SHORT,
			"hasUrl":  URL != "",
		})
	})

	router.POST("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{
			"content": "This is an index page...",
			"url":     URL,
			"short":   SHORT,
			"hasUrl":  URL != "",
		})
	})

	router.GET("/test", func(c *gin.Context) {
		url := "https://k6.io/docs/examples/single-request/"
		//get 1 random url
		short := "http://localhost:7777/" + RandomString(8)

		_, err := db.Exec("INSERT INTO urls (url, short_url) VALUES ($1, $2)", url, short)
		if err != nil {
			panic(err)
		}
		SHORT = short
		URL = url
		// delete the browser cache
		c.Header("Cache-Control", "no-cache, no-store, must-revalidate")

		//change the redirectmethod to GET
		c.Redirect(http.StatusTemporaryRedirect, url)
	})

	router.POST("/shorten", func(c *gin.Context) {
		// get the form value
		url := c.PostForm("url")
		//generate random short url
		short := "http://localhost:7777/" + RandomString(8)

		_, err := db.Exec("INSERT INTO urls (url, short_url) VALUES ($1, $2)", url, short)
		if err != nil {
			panic(err)
		}
		SHORT = short
		URL = url
		// delete the browser cache
		c.Header("Cache-Control", "no-cache, no-store, must-revalidate")

		//change the redirectmethod to GET
		c.Redirect(http.StatusTemporaryRedirect, "/")

	})

	router.GET("/:short_url", func(c *gin.Context) {
		//get parameter from url
		fmt.Println("done?????????2222")
		short_url := c.Param("short_url")
		//get url from db
		var url string
		err := db.QueryRow("SELECT url FROM urls WHERE short_url = $1", "http://localhost:7777/"+short_url).Scan(&url)
		if err != nil {
			panic(err)
		}
		c.Header("Cache-Control", "no-cache, no-store, must-revalidate")
		c.Redirect(http.StatusTemporaryRedirect, url)
		c.Abort()
	})

	router.Run("0.0.0.0:7777")
}
