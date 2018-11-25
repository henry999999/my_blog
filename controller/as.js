const moment = require("moment");
const conn = require("../db/index.js");
module.exports={
    handleArticleAdd(req,res){
        if(!req.session.isLogin)  return res.redirect("/");
        res.render("./article/article.ejs",{
            user:req.session.user,
            isLogin:req.session.isLogin
         })
        },
    handlePostArticleAdd(req,res){
        console.log(req.body);
        const body = req.body;
        // body.authorId = req.session.user.id;
        body.ctime = moment().format("YYYY-MM-DD HH-mm-ss");
        console.log(body);
        const insert = "insert into articles set ?";
        conn.query(insert,body,(err,result)=>{
            console.log(result);
            if(err) return res.send({status:501,msg:"发表失败!"});
            if(result.affectedRows!==1) return res.send({status:501,msg:"发表失败!"});
            res.send({status:200,msg:"发表成功!"});
        })
    }
}