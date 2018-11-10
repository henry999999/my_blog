/**
 * Created by Administrator on 2018/11/6 0006.
 */
const express = require("express");
const router = express.Router();
const controller = require("../controller/article.js");
router.get("/article/add",controller.handleArticleAdd);



module.exports = router;