/* 首先安装express   npm install express -g   安装完成后可以查看安装情况：npm ls -g */

let express = require('express');
let app = express();
console.log('服务已启动，http://127.0.0.1:8080');
app.use(express.static('public')).listen(8080);

// let http = require('http')
// http.createServer((req, res) => {
//     // 发送http头部

//     res.writeHead(200, {
//         'Content-type': 'text/plain'
//     })
//     res.end('Hello world\n')

// }).listen(8080)
// console.log('Server running at http://127.0.0.1:8080')
