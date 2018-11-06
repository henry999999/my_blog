/**
 * Created by Administrator on 2018/11/5 0005.
 */
const express = require("express");
const bodyParser = require("body-parser");
const moment = require("moment");
const app = express();
const mysql = require("mysql");
const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"blog"
})
app.use("/node_modules",express.static("./node_modules"));
app.set("view engine","ejs");
app.set("views","./view");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//渲染主页面
app.get("/",(req,res)=>{
    res.render("./index.ejs",{name:"zs",age:18});
});

//渲染登录页面
app.get("/login",(req,res)=>{
    res.render("./user/login.ejs",{});
});
//渲染注册页面
app.get("/register",(req,res)=>{
    res.render("./user/register.ejs",{});
});

//登录接口
app.post("/login",(req,res)=>{
    const user = req.body;
    if(user.username.trim().length==0||user.password.trim().length==0){
        res.send({status:400,msg:"用户名与密码不能为空"});
        return;
    }
    const selSql = "select count(*) as count from user where username = ? and password = ?";
    conn.query(selSql,[user.username,user.password],(err,result)=>{
        if(err) return res.status(500).send({status:500,msg:"登录失败!"})
        if(result[0].count==0) return res.send({status:400,msg:"用户名或密码有误"})
        res.send({status:200,msg:"登录成功"});
    })
});

//监听注册接口
app.post("/register",(req,res)=>{
    const user = req.body;
    if(user.username.trim().length==0||user.password.trim().length==0||user.nickname.trim().length==0 ){
        res.status(400).send({status:400,msg:"注册信息有误"});
        return;
    }
    const selectSql = "select count(*) as count from `user` where username = ?";
    conn.query(selectSql,user.username,(err,result)=>{
        if(err){
            res.status(500).send({status:500,msg:"注册失败!"});
            return;
        }
        if(result[0].count!=0){
            res.send({status:400,msg:"用户名已存在!"});
            return;
        }
        const sql = "insert into user set ?";
        user.ctime = moment().format('YYYY-MM-DD  HH:mm:ss');
        console.log(user.ctime);
        conn.query(sql,user,(err,result)=>{
            if(err){
                res.status(500).send({status:500,msg:"注册失败"});
                return;
            }
            res.send({status:200,msg:"恭喜您,注册成功!"});
        })
    })

})

app.listen(5002,()=>{
    console.log("http://127.0.0.1:5002");
})