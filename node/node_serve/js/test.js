/*
 * @Descripttion:
 * @version:
 * @Author: shetia
 * @Date: 2019-09-01 10:31:33
 * @LastEditors: somebody
 * @LastEditTime: 2019-09-01 10:34:21
 */
const db = require('./dbhelper');
// 查询实例
db.query('SELECT id,name,url,alexa,country FROM websites', [], function (result, fields) {
  console.log('查询结果：');
  console.log(result);
});
////添加实例
//var addSql = 'INSERT INTO websites(id,name,url,alexa,country) VALUES(0,?,?,?,?)';
//var addSqlParams = ['汪政', 'https://www.baidu.com','23453', 'CN'];
//db.query(addSql, addSqlParams, function(result, fields) {
//    console.log('添加成功')
//})