/*
用到两个基本插件
npm i clean-webpack-plugin html-webpack-plugin -D
clean-webpack-plugin：打包时自动清除输出文件夹中未用到的文件;
html-webpack-plugin：打包时会自动生成index.html并替换已有的index.html，bundle.js也会自行添加到 html 中
*/

const path = require('path')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'index'
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist') //定义输出文件夹dist路径
    }
}