## jq动画函数


#### 前端实现动画的技术有哪些？

    (1)CSS3 Transition

    (2)CSS3 Keyframes

    (3)JS 定时器：  setInterval 或 setTimeout 修改样式  (jQuery1&2)

    (4)requestAnimationFrame —— 效率最高 （jQuery3使用)

    > 注意：所有的jQuery动画函数都会自动排队！

  ##### (1)隐藏和显示动画——修改width/height/opacity

//参数为动画执行速度，动画执行完毕后执行的回掉函数
``` js
    $(..).show(speed, fn) //显示，默认速度为0

    $(..).hide(speed, fn) //隐藏，默认速度为0

    $(..).toggle(speed, fn) //隐藏显示的切换操作

```

  ##### (2)淡入/淡出动画——修改opacity
``` js
    $(..).fadeOut(speed,fu ) //淡出

    $(..).fadeIn( speed,fn) //淡入

    $(..).fadeToggle( speed,fn) //切换
```


  ##### (3)折叠展开/收起动画——修改的height
```js
    $(..).slideUp( speed,fn) //收起

    $(..).slideDown( speed,fn) //展开

    $(..).slideToggle( speed,fn) //切换
```


  ##### (4)万能动画函数——修改任意合法的属性
```js
    $(..).animate( {

    width: '300%',

    height: '30%',

    opacity: '0.6',

    left: '300px'

    } , 动画时间毫秒, fn)
```
> 注意：animate函数只能对数值型的属性执行定时器动画（如宽、高、透明度、位置...），

> 非数值型属性不能执行动画（如display、border-style、text-decoration）；默认情况下，不能对颜色相关属性执行动画！