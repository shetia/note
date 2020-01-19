

1. 近期发现项目中关于输入框在ios上点击失效，多次点击才可以获取焦点的问题，那么导致这个问题所在的原因是因为项目中引入了FastClick 这个是解决移动端延迟300毫秒的优化
当使用FastClick 时，输入框在ios上点击输入调取手机自带输入键盘不灵敏，有时候甚至点不出来。而安卓上完全没问题。这个原因是因为FastClick的点击穿透。解决方法如下：
```js
FastClick.prototype.focus = function (targetElement) {
  let length
  if (targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
    length = targetElement.value.length
    targetElement.focus()
    targetElement.setSelectionRange(length, length)
  } else {
    targetElement.focus()
  }
}
```

以上的代码可以直接拷贝粘贴到自己的项目中 main.js 文件中，经测试已完全没问题。