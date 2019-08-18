## favicon.ico

首先将favicon.ico图片放在根目录下，通过以下两种方法使其显示正确。
方法一：修改index.html文件
```html
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico"/>
```

方法二：修改webpack配置文件
    1、找到build下的webpack.dev.conf.js文件
``` js

new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      favicon: path.resolve('favicon.ico') // 增加
    }),
```

  2、找到build下的webpack.prod.conf.js文件
```js
new HtmlWebpackPlugin({
  filename: config.build.index,
  template: 'index.html',
  inject: true,
  favicon: path.resolve('favicon.ico'), //新增
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeAttributeQuotes: true
    ...
}),
```
