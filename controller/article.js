/**
 * Created by Administrator on 2018/11/6 0006.
 */
//const conn = require("../db/index.js");
module.exports={
    handleArticleAdd(req,res){
    res.render("./article/article.ejs",{
        user:req.session.user,
        isLogin:req.session.isLogin
    })
    }
}