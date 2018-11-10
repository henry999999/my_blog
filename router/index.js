/**
 * Created by Administrator on 2018/11/6 0006.
 */
const express = require("express");
const router = express.Router();
const controller = require("../controller/index.js")
//渲染主页面
router.get("/",controller.handleIndexGet);


module.exports = router;

