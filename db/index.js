/**
 * Created by Administrator on 2018/11/6 0006.
 */
const mysql = require("mysql");
const conn = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"blog"
})

module.exports = conn;