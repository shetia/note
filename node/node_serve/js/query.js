/*
 * @Descripttion:
 * @version:
 * @Author: shetia
 * @Date: 2019-09-01 09:40:03
 * @LastEditors: somebody
 * @LastEditTime: 2019-09-01 10:10:06
 */
/**
 * node.js 操作数据库之查询数据
 */
const mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'test'
});

connection.connect();

let sql = 'SELECT id,name,url,alexa,country FROM websites';
//查
connection.query(sql, function (err, result) {
  if (err) {
    console.log('[SELECT ERROR] - ', err.message);
    return;
  }

  console.log('--------------------------SELECT----------------------------');
  console.log(result);
  console.log('------------------------------------------------------------\n\n');
});

connection.end();