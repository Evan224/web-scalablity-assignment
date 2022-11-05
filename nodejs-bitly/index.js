const koa=require('koa');
const eta = require("eta");
const dotenv = require("dotenv");
const path = require("path")
const Router = require('@koa/router');
const app = new koa();
const { koaBody } = require('koa-body');
const router = new Router();
eta.configure({
    views: path.join(__dirname, "views")
  })


  const Pool = require("pg").Pool;
  const pool = new Pool({
    host:process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.DB_PORT || "5432")
  });


  const sql = "CREATE TABLE IF NOT EXISTS urls (id SERIAL PRIMARY KEY, url VARCHAR(255), short_url VARCHAR(255))";
pool.query(sql, function (err, result) {
  if (err) {
    console.log("fail to create table");
  }
});

dotenv.config(); //Reads .env file and makes it accessible via process.env

let URL="";
let SHORTURL="";
app.use(koaBody({ multipart: true }));
router.get('/', async (ctx, next) => {
    ctx.type='html';
    ctx.body=await eta.renderFile("view", {
      data: "Hello World!",
      url:URL,
      short_url:SHORTURL
    })
});

router.post('/shorten', async (ctx, next) => {
    const body=await ctx.request.body;
    const url=body.url;
    const basicUrl="http://localhost:7777/";
    const shortUrl=basicUrl+Math.random().toString(36).substring(2, 7) + Math.random().toString(36).substring(2, 7);
    const sql = "INSERT INTO urls (url,short_url) VALUES ($1,$2)";
    const values = [url,shortUrl];
    await pool.query(sql, values, await function (err, result) {
    });
    URL=url;
    SHORTURL=shortUrl;
    ctx.redirect('/');
});

router.get('/', async (ctx, next) => {
    ctx.type='html';
    ctx.body=await eta.renderFile("view", {
      data: "Hello World!",
      url:URL,
      short_url:SHORTURL
    })
});

router.get('/random', async (ctx, next) => {
    const sql="SELECT * FROM urls order by random() limit 1";
    const values = [];
    let resultUrl="/";
    const result=await pool.query(sql,values);
    if (result.rows.length>0) {
      resultUrl=result.rows[0].url;
    }
    ctx.redirect(resultUrl);
});

router.get("/test",async function(ctx, next){
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
  ctx.redirect(shortUrl);
})

router.get('/:short_url', async (ctx, next) => {
    const short_url=ctx.params.short_url;
    const basicUrl="http://localhost:7777/";
    const sql="SELECT * FROM urls WHERE short_url=$1";
    const values = [basicUrl+short_url];
    let resultUrl="";
    const result=await pool.query(sql,values);  
    if (result.rows.length>0) {
      resultUrl=result.rows[0].url;
    }
    ctx.redirect(resultUrl);

});

app.use(router.routes())

app.listen(7777);