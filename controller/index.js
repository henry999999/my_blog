/**
 * Created by Administrator on 2018/11/6 0006.
 */
module.exports = {
    //渲染主页面
    handleIndexGet(req,res){
    res.render("./index.ejs", {
        user:req.session.user,
        isLogin:req.session.isLogin
    });
   }
}