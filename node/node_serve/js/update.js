/*
 * @Descripttion:
 * @version:
 * @Author: shetia
 * @Date: 2019-09-01 10:27:26
 * @LastEditors: somebody
 * @LastEditTime: 2019-09-01 10:29:19
 */
/**
 * node.js 操作数据库之修改数据
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

let modSql = 'UPDATE websites SET name = ?,url = ? WHERE name = ?';
let modSqlParams = ['汪政2222222222222', 'https://www.google-api.ac.cn', '汪政'];
//改
connection.query(modSql, modSqlParams, function (err, result) {
  if (err) {
    console.log('[UPDATE ERROR] - ', err.message);
    return;
  }
  console.log('--------------------------UPDATE----------------------------');
  console.log('UPDATE affectedRows', result.affectedRows);
  console.log('-----------------------------------------------------------------\n\n');
});

connection.end();