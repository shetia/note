// 测试写的promise是否符合Promises/A+规范(https://promisesaplus.com/) 先安装 npm install --save-dev promises-aplus-tests 然后运行本文件
var promisesAplusTests = require("promises-aplus-tests")
var adapter = require("./promise.js")

promisesAplusTests(adapter, function (err) {
  console.log(err)
    // All done; output is in the console. Or check `err` for number of failures.
});