/*
    先安装webpack-merge,用以合并通用配置文件与开发环境配置文件
    npm i webpack-merge -D
    安装开发服务器devServer,作用是修改代码后实时重新加载（刷新浏览器）
    npm i webpack-dev-server -D
*/
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
var os = require('os'); //获得当前可用网络
function getIps() {
    let ifaces = os.networkInterfaces();
    let arr = [];
    for (let dev in ifaces) {
        ifaces[dev].forEach(function (details) {
            if (details.family == 'IPv4') {
                // console.log(dev,details.address);
                arr.push(details.address)
            }
        });
    }
    console.log('获得当前可用网络:' + arr)
    return arr
}
module.exports = merge(common, {
    devtool: 'cheap-module-eval-source-map', //sourcemap 能实现打包后的运行代码与源代码的映射，帮助我们debug到原始开发代码。
    devServer: { //启用开发服务器
        contentBase: './dist', //告诉服务器从哪里提供内容，只有在想要提供静态文件时才需要
        compress: true, //一切服务器都启用gzip压缩
        host: getIps()[0], // 指定使用一个host，可用ip地址访问，没有的话如果别人访问会被禁止，默认localhost
        port: '9999', // 指定端口号，如省略，默认8080
        hot: true, //启用模块热替换特性
        inline: true, //启用内联模式，一段处理试试重载的脚本被插入到bundle中，并且构建消息会出现在浏览器控制台
        historyApiFallback: true, //开发单页应用时有用，依赖于html5 history Api，设为true时所有跳转将指向index.html
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), // webpack内置的热更新插件 HotModuleReplacementPlugin 模块热替换(Hot Module Replacement)插件，用以在运行时更新发生改变的模块，从而无需进行完全刷新。
    ],
    mode: 'development'
})