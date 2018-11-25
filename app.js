/**
 * Created by Administrator on 2018/11/5 0005.
 */
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const app = express();
app.use("/node_modules",express.static("./node_modules"));

//引用ejs中间件
app.set("view engine","ejs");
app.set("views","./view");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 使用 session 中间件
app.use(session({
    secret :  'my_blog', // 对session id 相关的cookie 进行签名
    resave : false,
    saveUninitialized: false // 是否保存未初始化的会话
    //cookie : {
    //    maxAge : 1000 * 3  // 设置 session 的有效时间，单位毫秒
    //            // 两次请求的时间差 即超过这个时间再去访问 session就会失效
    //}
}));

//用循环的方式 进行路由注册
 fs.readdir(path.join(__dirname,"./router"),(err,filenames)=>{
   if(err) return console.log("读取路由文件失败");
     filenames.forEach(item=>{
         const router = require(path.join(__dirname,"./router",item));
         app.use(router);
     })
 })

const router1 = require("./router/article.js");
app.use(router1);


app.listen(5002,()=>{
    console.log("http://127.0.0.1:5002");
})