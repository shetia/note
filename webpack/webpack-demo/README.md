## webpack4 基本配置

### 起步

初始化配置文件 package.json 并安装 webpack

```js
    mkdir webpack-demo && cd webpack-demo
    npm init -y    //-y 初始化选项默认为 yes
    npm i webpack webpack-cli -D // -D 即 -save-dev    版本4.x以上需要安装webpack-cli
```

创建以下目录结构、文件和内容：

```js
webpack-demo
  |- package.json
+ |- /src
+   |- index.js
```

```js
//index.js
document.write('Hello webpack4!');
```

###创建 webpack 配置文件
编写开发环境和生产环境彼此独立的 webpack 配置文件
先添加三个文件

```js
webpack-demo
  |- package.json
+ |- webpack.common.js
+ |- webpack.dev.js
+ |- webpack.prod.js
  |- /src
    |- index.js
  |- /node_modules
```

1.webpack.common.js
用到两个基本的插件

```
npm i clean-webpack-plugin html-webpack-plugin -D
```

clean-webpack-plugin：打包时自动清除输出文件夹中未用到的文件;
html-webpack-plugin：打包时会自动生成 index.html 并替换已有的 index.html，bundle.js 也会自行添加到 html 中。

```js
//webpack.common.js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
};
```

2.webpack.dev.js
先安装 webpack-merge,用以合并通用配置文件与开发环境配置文件

```
npm i webpack-merge -D
```

安装开发服务器 devServer,作用是修改代码后实时重新加载（刷新浏览器）

```
npm i webpack-dev-server -D
```

```
//webpack.dev.js
  const merge = require('webpack-merge');
  const common = require('./webpack.common.js');
  const webpack = require('webpack');

  module.exports = merge(common,{
     devServer: {                //启用开发服务器
       contentBase: './dist',   //告诉服务器从哪提供内容，只有在想要提供静态文件时才需要
       compress: true,          //一切服务都启用gzip 压缩
       host: '0.0.0.0',         //指定使用一个host，可用ip地址访问，没有的话如果别人访问会被禁止。默认localhost。
       port: '9999',            //指定端口号，如省略，默认为”8080“
       hot: true,               //启用模块热替换特性
       inline: true,            //启用内联模式，一段处理实时重载的脚本被插入到bundle中，并且构建消息会出现在浏览器控制台
       historyApiFallback: true,//开发单页应用时有用，依赖于HTML5 history API，设为true时所有跳转将指向index.html
     },
     plugins: [
         new webpack.HotModuleReplacementPlugin(),  //webpack内置的热更新插件
     ],
     mode: 'development'
  });
```

devServer 的更多[可选参数](https://www.webpackjs.com/configuration/dev-server/)
HotModuleReplacementPlugin 模块热替换(Hot Module Replacement)插件，用以在运行时更新发生改变的模块，从而无需进行完全刷新。

3.webpack.prod.js
同样用'webpack-merge'合并通用配置文件与生产环境配置文件

```js
//webpack.prod.js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production'
});
```

> 关于 mode
> 此时你可能会注意到配置文件中有个 mode 项，webpack4 中新加，作用如下:
> +--mode production 生产环境

不需要像旧版本一样定义 node 环境变量
new webpack.DefinePlugin({"process.env.NODE_ENV":JSON.stringify("production") })

```
ps：许多 library 将通过与 process.env.NODE_ENV 环境变量关联，以决定 library 中应该引用哪些内容。当使用 process.env.NODE_ENV === 'production' 时，一些 library 可能针对具体用户的环境进行代码优化，从而删除或添加一些重要代码。
```

自动开启一些插件，如：
uglifyjs-webpack-plugin js 代码压缩(所以无需再单独使用)
NoEmitOnErrorsPlugin 编译出错时跳过输出，以确保输出资源不包含错误
ModuleConcatenationPlugin webpack3 添加的作用域提升(Scope Hoisting)

+--mode development 开发环境
自行定义 node 环境变量为 development
new webpack.DefinePlugin({"process.env.NODE_ENV":JSON.stringify("development") })
使用 eval 构建 module, 提升增量构建速度
自动开启一些插件，如
NamedModulesPlugin 使用模块热替换(HMR)时会显示模块的相对路径

###启动
在 package.json "scripts" 中添加 npm 脚本，从而快捷运行开发服务器 | 打包生产环境代码

```
{
  "name": "webpack-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --open --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.35.3",
    "webpack-cli": "^3.3.5",
    "webpack-dev-server": "^3.7.2",
    "webpack-merge": "^4.2.1"
  }
}
```

"start": "webpack-dev-server --open --config webpack.dev.js",

```js
webpack-dev-server    启动开发服务器
--open    打开浏览器
--config webpack.dev.js    设置运行此脚本时执行的配置文件为webpack.dev.js
```

"build": "webpack --config webpack.prod.js"

```
webpack 启动webpack
--config webpack.prod.js   设置运行此脚本时执行的配置文件为webpack.prod.js
```

```
执行 npm start
```

此时应该可以看到 Hello webpack4!

```
执行 npm run build
```

项目文件夹中自动生成打包后的文件目录（输出文件夹 dist）

```
webpack-demo
  |- package.json
  |- webpack.common.js
  |- webpack.dev.js
  |- webpack.prod.js
  |- /src
    |- index.js
  |- /dist
      | - index.html
      | - app.bundle.js
  |- /node_modules
```
