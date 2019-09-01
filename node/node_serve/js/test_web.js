/*
 * @Descripttion:
 * @version:
 * @Author: shetia
 * @Date: 2019-09-01 10:34:43
 * @LastEditors: somebody
 * @LastEditTime: 2019-09-01 10:46:44
 */
const db = require('./dbhelper');
let express = require('express');
let app = express();
let arr = [];
// 查询实例
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
db.query('SELECT id,name,url,alexa,country FROM websites', [], function (result, fields) {
  app.get('/select', function (req, res) {
    res.send(result);
  });
});
app.listen(3000);
console.log('listenning http://localhost:3000')