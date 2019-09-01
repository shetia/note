/*
 * @Descripttion:
 * @version:
 * @Author: shetia
 * @Date: 2019-09-01 10:26:43
 * @LastEditors: somebody
 * @LastEditTime: 2019-09-01 10:26:56
 */
/**
 * node.js 操作数据库之删除数据
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

let delSql = 'DELETE FROM websites where id = 8';
//删
connection.query(delSql, function (err, result) {
  if (err) {
    console.log('[DELETE ERROR] - ', err.message);
    return;
  }

  console.log('--------------------------DELETE----------------------------');
  console.log('DELETE affectedRows', result.affectedRows);
  console.log('-----------------------------------------------------------------\n\n');
});

connection.end();