/**
 * Created by Administrator on 2018/11/6 0006.
 */
const moment = require("moment");
const conn = require("../db/index.js");
module.exports = {
    //渲染登录页面
    handleLoginGet(req,res){
    res.render("./user/login.ejs",{});
  },
    //登录接口
    handleLoginPost(req,res){
    const user = req.body;
    if(user.username.trim().length==0||user.password.trim().length==0){
        res.send({status:400,msg:"用户名与密码不能为空"});
        return;
    }
    const selSql = "select * from user where username = ? and password = ?";
    conn.query(selSql,[user.username,user.password],(err,result)=>{
        if(err) return res.status(500).send({status:500,msg:"登录失败!"})
        if(result.length!=1) return res.send({status:400,msg:"用户名或密码有误"});
        //将登录成功后的用户信息挂载到session上
        req.session.user = result[0];
        //将登录状态挂载到session上
        req.session.isLogin = true;
        res.send({status:200,msg:"登录成功"});
    });

 },
    //渲染注册页面
    handleRegisterGet(req,res){
    res.render("./user/register.ejs",{});
 },
    //监听注册接口
    handleRegisterPost(req,res){
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
        conn.query(sql,user,(err,result)=>{
            if(err){
                res.status(500).send({status:500,msg:"注册失败"});
                return;
            }
            res.send({status:200,msg:"恭喜您,注册成功!"});
        })
    })
 },
    handleLogoutGet(req,res){
        //清除用户seesion信息
        req.session.destroy();
        //重定向
        res.redirect("/");
    }
}