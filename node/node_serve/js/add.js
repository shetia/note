/*
 * @Descripttion:
 * @version:
 * @Author: shetia
 * @Date: 2019-09-01 10:22:23
 * @LastEditors: somebody
 * @LastEditTime: 2019-09-01 10:25:19
 */
/**
 * node.js 操作数据库之添加数据
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

let addSql = 'INSERT INTO websites(id,name,url,alexa,country) VALUES(0,?,?,?,?)';
let addSqlParams = ['张翠花', 'https://www.baidu.com', '23453', 'CN'];
connection.query(addSql, addSqlParams, function (err, result) {
  if (err) {
    console.log('[INSERT ERROR] - ', err.message);
    return;
  }
  console.log('--------------------------INSERT----------------------------');
  console.log('INSERT ID:', result);
  console.log('-----------------------------------------------------------------\n\n');
});
connection.end();