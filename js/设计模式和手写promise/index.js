/*
 * @Descripttion:
 * @version:
 * @Author: shetia
 * @Date: 2020-07-16 20:14:54
 * @LastEditors: somebody
 * @LastEditTime: 2020-07-24 22:29:49
 */
let Promise1 = require('./promise.js')
let promise = new Promise1((resolve, reject) => {
    resolve('hello ')
})
let fs = require('fs')
function read(url){
  // return new Promise((resolve, reject) => {
    let dfd = Promise1.defer()  // 解决封装嵌套问题
    fs.readFile(url, 'utf-8', (err, res) => {
      if(err) dfd.reject()
      dfd.resolve(res)
    })
    return dfd.promise
  // })
}
Promise1.all([1,2,3, read('./name.txt'), 4,5, read('./age.txt')]).then((res) => {
  console.log(res)
},err => {
  console.log(err, '报错')
})