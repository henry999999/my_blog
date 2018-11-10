/**
 * Created by Administrator on 2018/11/6 0006.
 */
const express = require("express");
const router = express.Router();
const controller = require("../controller/user.js");

//渲染登录页面
router.get("/login",controller.handleLoginGet);
//渲染注册页面
router.get("/register",controller.handleRegisterGet);

//登录接口
router.post("/login",controller.handleLoginPost);

//监听注册接口
router.post("/register",controller.handleRegisterPost);

//注销接口
router.get("/loginOut",controller.handleLogoutGet);
module .exports = router;