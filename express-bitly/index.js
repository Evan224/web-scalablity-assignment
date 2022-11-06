const express = require("express");
const app = express();
const eta = require("eta");
const dotenv = require("dotenv");
const formidable = require('express-formidable');

app.engine("eta", eta.renderFile);
app.set("view engine", "eta");
app.set("views", "./views");
app.use(formidable());
dotenv.config(); //Reads .env file and makes it accessible via process.env
const Pool = require("pg").Pool;
const pool = new Pool({
  host:process.env.PGHOST,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: parseInt(process.env.DB_PORT || "5432")
});

// create Table


let URL="";
let SHORTURL="";
app.get("/", function (req, res) {
  const sql = "CREATE TABLE IF NOT EXISTS urls (id SERIAL PRIMARY KEY, url VARCHAR(255), short_url VARCHAR(255))";
pool.query(sql, function (err, result) {
  if (err) {
    console.log("fail to create table");
  }
});
  res.render("view", {
    data: "Hello World!",
    url:URL,
    short_url:SHORTURL
  });
})

app.post("/shorten", function (req, res) {
  const url=req.fields.url;
  const basicUrl="http://localhost:7777/";
  const shortUrl=basicUrl+Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7);
  const sql = "INSERT INTO urls (url,short_url) VALUES ($1,$2)";
  const values = [url,shortUrl];
  pool.query(sql, values, function (err, result) {
    if (err) {
      console.log('?????');
      console.log(err);
    }
    URL=url;
    SHORTURL=shortUrl;
    res.status(302).redirect("/");
  });
});

app.get("/random", function (req, res) {
  const sql="SELECT * FROM urls order by random() limit 1";
  const values = [];
  pool.query(sql,values,function (err, result) {
    if (err) {
      console.log(err);
    }
    if(result.rows.length>0){
      //status 302
      // res.redirect(result.rows[0].url);
      //set the res state to 302
      res.status(302).redirect(result.rows[0].url);
    }else{
      res.redirect("/");
    }
  });
});

app.get("/test",async function(req,res){
  //generate random string
  const url="https://k6.io/docs/examples/single-request/";
  const basicUrl="http://localhost:7777/";
  const shortUrl=basicUrl+Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7);
  const sql = "INSERT INTO urls (url,short_url) VALUES ($1,$2)";
  const values = [url,shortUrl];
  await pool.query(sql, values, function (err, result) {
    if (err) {
      console.log(err);
    }
  });
  res.status(302).redirect(shortUrl);
})

app.get("/:shortened", function (req, res) {
  const url= req.params.shortened;
  console.log(url);
  const sql="SELECT * FROM urls WHERE short_url=$1";
  const values = ["http://localhost:7777/"+url];
  pool.query(sql, values, function (err, result) {
    if (err) {
      console.log('?????');
      console.log(err);
    }
    if(result.rows.length>0){
      res.status(302).redirect(result.rows[0].url);
    }else{
      res.redirect("/");
    }
  });
});

const PORT=process.env.PORT || 7777;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});