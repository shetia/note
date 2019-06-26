### vue移动端适配

vue移动端项目，
	不能用mintui配合px2remLoader用，不然mintui中的组件会变得好小，解决就是使用postcss-plugin-px2rem，下载命令：npm install --save-dev postcss-plugin-px2rem，然后在build文件夹下面的vue-loader.conf.js文件里配置，
```js
    const px2rem = require('postcss-plugin-px2rem');
    postcss: function () {
        return [px2rem({ rootValue: 75 })];
    }
```