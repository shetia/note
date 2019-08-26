#ios 键盘收起 键盘不回弹

```js
/*
    addEventListener()与removeEventListener()用于处理指定和删除事件处理程序操作。
     它们都接受3个参数：如     addEventListener("事件名" , "事件处理函数" , "布尔值");        (注：事件名不含"on",如“click”)
     现在的版本可以省略第三个参数，默认值为false
 */
 mounted(){
    document.body.addEventListener('focusout', () =>{ 
      //H5 ios移动端，键盘收起以后页面不缩回
      window.scroll(0,0);//失焦后强制让页面归位
    })
  },
  destroyed(){
    document.body.removeEventListener('focusout',()=>{})
  },
```