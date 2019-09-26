## vue组件发布npm整个流程

记录一下组件发布流程，参考[Vue cli3 库模式搭建组件库并发布到 npm](http://www.rxshc.com/180.html)


### 起步

首先，我们从零开始搭建一个vue项目，以vue-cli3 来搭建。
```js
vue create my-project
```
长这样子的：

![](https://user-gold-cdn.xitu.io/2019/9/26/16d6b543812fabb0?w=1024&h=768&f=png&s=94536)
### 调整目录

安装项目之后我们来修改一下目录结构
```
.
...
|-- examples      // 原 src 目录，改成 examples 用作示例展示
|-- packages      // 新增 packages 用于编写存放组件
...
. 
```

修改之后，运行项目我们会发现报错了，那是因为目录结构改了，还有就是packges这个文件夹是我们新增的，webpack无法获取编译，我们需要在webpack里加上。

我们会新建一个vue.config.js的配置文件，这个vue-cli3提供的一个可选配置文件，我们可以在里面配置整个项目所有的webpack配置。
我们可以直接去 [vue-cli3的配置](https://cli.vuejs.org/zh/config/#pages) 复制过来,而 [chainWebpack](https://cli.vuejs.org/zh/guide/webpack.html#%E9%93%BE%E5%BC%8F%E6%93%8D%E4%BD%9C-%E9%AB%98%E7%BA%A7) 会给我们提供链式操作
```js
// vue-config.js
module.exports = {
  // 修改 src 目录 为 examples 目录
  pages: {
    index: {
      // page 的入口
      entry: 'examples/main.js',   // 把src 修改为examples
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html'
    }
  },
  // 扩展 webpack 配置，使 packages 加入编译
  /* chainWebpack 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。 */
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
        .add(__dirname + 'packages')  // 注意这里需要绝对路径，所有要拼接__dirname
        .end()
      .use('babel')
        .loader('babel-loader')
        .tap(options => {
          // 修改它的选项...
          return options
        })
  }
}
```
以上就是基本的配置，接下来我们就开始创建一个组件
### 编写组件
这里我就以一个按钮组件来做尝试。
在之前我们新建的 packages 目录中新建 comColorButton 文件夹和index.js文件，然后再在comColorButton文件夹里，创建src文件夹和index.js文件，目录结构如下：
```
|——
|——packages
|   |——index.js
|   |——comColorButton
|      |——index.js
|      |——src
|         |——color-button.vue
|——
```
这是color-button.vue的内容
```vue
<!-- color-button.vue -->
<template>
  <span class="color-button">
    <button :class="[type, disabled?'disabled':'']" :disabled="disabled">
      <slot></slot>
    </button>
  </span>
</template>

<script>
export default {
  name:'ComColorButton',
  props:{
      type:{
      type:String,
      default:'primary'
    },
      disabled:{
      type:Boolean,
      default:false
    },
  }, 
  data () {
    return {

    }
  }
}
</script>

<style lang='scss'>
$pColor:#333;
$sColor:#0db677;
$wColor:orange;
$dColor:red;
$disabledColor:gray;
.color-button{
  display: inline-block;
  margin-right:10px;
  button{
    display: inline-block;
    padding:10px 20px;
    border:2px solid $pColor;
    background:#fff;
    font-size: 16px;
    width:auto;
    cursor: pointer;
    transition:all 0.5s;
    &:hover{
      box-shadow: 100px 0px 0px 0px $pColor inset;
      color:#fff;
    }
    &.success{
      border:2px solid $sColor;
      color: $sColor;
      &:hover{
        box-shadow: 100px 0px 0px 0px $sColor inset;
        color:#fff;
      }
    }
    &.warning{
      border:2px solid $wColor;
      color: $wColor;
      &:hover{
        box-shadow: 100px 0px 0px 0px $wColor inset;
        color:#fff;
      }
    }
    &.danger{
      border:2px solid $dColor;
      color: $dColor;
      &:hover{
        box-shadow: 100px 0px 0px 0px $dColor inset;
        color:#fff;
      }
    }
    &.disabled{
      border:2px solid $disabledColor;
      color: $disabledColor;
      cursor:not-allowed ;
      &:hover{
        box-shadow:none;
        color: $disabledColor;
      }
    }
  }
}
</style>

```
这是comColorButton文件夹内的index.js
```js
// 导入组件，组件必须声明 name
import ComColorButton from './src/color-button.vue'

// 为组件提供 install 安装方法，供按需引入
ComColorButton.install = function (Vue) {
  Vue.component(ComColorButton.name, ComColorButton)
}

// 默认导出组件
export default ComColorButton
```

这是 packages 文件夹内的index.js
```js
import ComColorButton from './comColorButton'
// 存储组件列表
const components = [
  ComColorButton
] 
/* 
  定义install 方法，接收Vue作为参数，如果使用use注册插件，则所有的组件都将被注册
*/
const install = function (Vue) {
  // 判断是否安装
  if(install.installed){return}
  // 遍历所有组件
  components.map(item => {
    Vue.component(item.name,item)
  })
}
// 判断是否引入文件
if(typeof window !== 'undefined' && window.Vue){
  install(window.Vue)
}
export default{
  install,
  ComColorButton
}
```

以上之后，组件就写完了，接下来就是引入组件了
``` js
/* main.js */
// 导入组件库
import ComColorButton from './../packages/index'
// 注册组件库
Vue.use(ComColorButton)
```

使用组件库
```html
<template>
  <div class="hello">
    <com-color-button type="success" :disabled="false">按钮</com-color-button> 
    <com-color-button :disabled="true">按钮</com-color-button>
  </div>
</template>
```
我们可以看到效果：

![](https://user-gold-cdn.xitu.io/2019/9/26/16d6b4b00ee600ff?w=818&h=632&f=png&s=22950)
### 发布npm 方便直接在项目中引用

到此为止我们一个完整的组件库已经开发完成了，接下来就是发布到 npm 以供后期使用

#### 1、package.json 中新增一条编译为库的命令
在库模式中，Vue是外置的，这意味着即使在代码中引入了 Vue，打包后的文件也是不包含Vue的。

以下我们在 scripts 中新增一条命令 npm run lib

+ --target: 构建目标，默认为应用模式。这里修改为 lib 启用库模式。
+ --dest : 输出目录，默认 dist。这里我们改成 lib
+ [entry]: 最后一个参数为入口文件，默认为 src/App.vue。这里我们指定编译 packages/ 组件库目录。

```json
"scripts": {
    // ...
    "lib": "vue-cli-service build --target lib --name vcolorpicker --dest lib packages/index.js"
}
```
执行编译库命令
```
npm run lib
```

![](https://user-gold-cdn.xitu.io/2019/9/26/16d6b5af7920d49a?w=661&h=454&f=png&s=55267)
之后我们就可以看到会生成一个文件夹lib包含很多文件，长这样子的：

![](https://user-gold-cdn.xitu.io/2019/9/26/16d6b4d68c9e8584?w=1080&h=953&f=png&s=179381)

#### 2、配置 package.json 文件中发布到 npm 的字段
+ name: 包名，该名字是唯一的。可在 npm 官网搜索名字，如果存在则需换个名字。
+ version: 版本号，每次发布至 npm 需要修改版本号，不能和历史版本号相同。
+ description: 描述。
+ main: 入口文件，该字段需指向我们最终编译后的包文件。
+ keyword：关键字，以空格分离希望用户最终搜索的词。
+ author：作者
+ private：是否私有，需要修改为 false 才能发布到 npm
+ license： 开源协议
以下为参考设置
```json
 "name": "com-color-button",
  "version": "0.1.3",
  "description": "基于 Vue 的按钮",
  "main": "lib/comColorButton.umd.min.js",
  "keyword": "colorButton button color",
  "private": false,

```

#### 3、添加 .npmignore 文件，设置忽略发布文件
我们发布到 npm 中，只有编译后的 lib 目录、package.json、README.md才是需要被发布的。所以我们需要设置忽略目录和文件。
和 .gitignore 的语法一样，具体需要提交什么文件，看各自的实际情况。
```
# 忽略目录
examples/
packages/
public/

# 忽略指定文件
vue.config.js
babel.config.js
*.map

```
#### 4、登录到 npm
首先需要到 npm 上注册一个账号,注意验证邮箱，不然之后会发布不了。
如果配置了淘宝镜像，先设置回npm镜像
```
npm config set registry http://registry.npmjs.org 
```
然后在终端执行登录命令，输入用户名、密码、邮箱即可登录。
```
npm login
```

#### 5、发布到 npm

执行发布命令，发布组件到 npm
```
npm publish
```

![](https://user-gold-cdn.xitu.io/2019/9/26/16d6b5bc7ab28000?w=661&h=514&f=png&s=92420)
这里如果还没有验证邮箱的话话报个，需要验证邮箱的错误。去npm上验证邮箱即可，它会在页面顶部弹出个需要验证邮箱的提示。

#### 6、发布成功
发布成功后稍等几分钟，可查看自己npm账号的packages，也可在 npm 官网搜索。 

去npm查看，我们可以packages下看到发布成功了，如下图：
![](https://user-gold-cdn.xitu.io/2019/9/26/16d6b4f823ed90c6?w=1906&h=942&f=png&s=85791)
#### 7、使用新发布的组件库
安装
```
cnpm install com-color-button -S
```

 引入
```
<!--main.js-->
import ComColorButton from 'com-color-button'
import 'com-color-button/lib/comColorButton.css'
Vue.use(ComColorButton)
```

组件中使用
```
...
<com-color-button type="success">按钮</com-color-button>
...
```
到此就全部结束了，这都是亲自实践过的，可用。