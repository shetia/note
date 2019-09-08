<!--
 * @Descripttion:
 * @version:
 * @Author: shetia
 * @Date: 2019-09-08 10:09:00
 * @LastEditors: somebody
 * @LastEditTime: 2019-09-08 10:26:56
 -->

##vue 自动化引入

###require.context
一个 webpack 的 api,通过执行 require.context 函数获取一个特定的上下文,主要用来实现自动化导入模块,在前端工程中,如果遇到从一个文件夹引入很多模块的情况,可以使用这个 api,它会遍历文件夹中的指定文件,然后自动导入,使得不需要每次显式的调用 import 导入模块

> require.context() 方法来创建自己的（模块）上下文，这个方法有 3 个参数：
>
> - 要搜索的文件夹目录
> - 是否还应该搜索它的子目录，
> - 以及一个匹配文件的正则表达式。

###使用 require.context 全局引入自定义组件
如果项目中有使用很频繁的组件，我们可以通过全局引入的方式，我们可以在组件文件夹中新建一个文件夹 common 用来存放全局组件，在里面新建一个 index.js

```js
// index.js
import Vue from 'vue';

function changeStr(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const requireComponent = require.context('.', false, /\.vue$/); // false 不遍历子目录，true遍历子目录

requireComponent.keys().forEach(fileName => {
  const config = requireComponent(fileName);
  const componentName = changeStr(
    fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')
  );
  Vue.component(componentName, config.default || config);
});
```

然后在入口文件引入该文件

```js
// main.js
import '@/components/common';
```

这样我们就可以在 common 的文件夹内，新建各种组件，index.js 就可以自动引入（不用每新增一个组件就去引入），就可以在其他地方使用组件了。

## 使用 require.context 动态引入路由

在路由文件夹内的 index.js，我们有这么一段代码

```js
const routerList = []; //用来存放引入的地址

function importAll(r) {
  r.keys().forEach(key => {
    routerList.push(r(key).default);
  });
}
importAll(require.context('.', true, /\.routes\.js/));
```

这样我们就可以在，路由文件夹内新建各种带.routes.js 后缀的文件，分模块来新建，比如新建个 home.routes.js

```js
export default {
  path: '/home',
  name: 'home',
  redirect: '/home/tree_table',
  component: () => import('@/views/index.vue'),
  children: [
    {
      path: 'tree_table',
      name: 'tree_table',
      component: () => import('@/views/treeTable.vue')
    },
    {
      path: 'merge_table',
      name: 'merge_table',
      component: () => import('@/views/mergeTable.vue')
    },
    {
      path: 'is_com',
      name: 'is_com',
      component: () => import('@/views/is.vue')
    },
    {
      path: 'model_com',
      name: 'model_com',
      component: () => import('@/views/modelCom.vue')
    },
    {
      path: 'plugin_betterScroll',
      name: 'pluginBetterScroll',
      component: () => import('@/views/plugin/betterScroll.vue')
    },
    {
      path: 'form',
      name: 'form',
      component: () => import('@/views/form/index.vue')
    },
    {
      path: 'text_editor',
      name: 'text_editor',
      component: () => import('@/views/textEditor.vue')
    },
    {
      path: 'quill_editor',
      name: 'quill_editor',
      component: () => import('@/views/quillEditor.vue')
    }
  ]
};
```

然后在 index.js 中使用即可

```js
import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const routerList = [];

function importAll(r) {
  r.keys().forEach(key => {
    routerList.push(r(key).default);
  });
}
importAll(require.context('.', true, /\.routes\.js/));
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    ...routerList
  ]
});
```
