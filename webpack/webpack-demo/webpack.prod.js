const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
    mode: 'production'
})



/*
mode项，webpack4中新加，作用如下:
-----------------------------------------------------------------------
 --mode production 生产环境
    不需要像旧版本一样定义node环境变量 :new webpack.DefinePlugin({"process.env.NODE_ENV":JSON.stringify("production") })
    ps：许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。
    自动开启一些插件，如：
    uglifyjs-webpack-plugin js代码压缩(所以无需再单独使用)
    NoEmitOnErrorsPlugin 编译出错时跳过输出，以确保输出资源不包含错误
    ModuleConcatenationPlugin webpack3 添加的作用域提升(Scope Hoisting)
-------------------------------------------------------------------------
--mode development 开发环境
    自行定义node环境变量为development
    new webpack.DefinePlugin({"process.env.NODE_ENV":JSON.stringify("development") })
    使用 eval 构建 module, 提升增量构建速度
    自动开启一些插件，如
    NamedModulesPlugin 使用模块热替换(HMR)时会显示模块的相对路径

*/