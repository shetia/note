## vue设置找不到此路由就跳到默认跳转或404页

```js
  //在router文件中添加
  {
    path: '*',
    redirect:'/404', 
  },

```