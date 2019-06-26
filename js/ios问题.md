h5页面在不同ios设备上的问题总结
最近在写嵌入到小程序webview的一个h5页面，是一个文章评论的功能，这个过程中，遇到很多兼容性的问题，在不同机型上的表现也很不一致，所以总结了以下这些问题，记录下来，以便以后查看

1、日期问题
对于yyyy-mm-dd hh:mm:ss 这种格式在ios系统不识别

时间格式化的时候，在浏览器端处理好好的，到了手机端，就变成NAN，或者null，这种情况，是ios系统不能转化这种类型的时间。

`let date = new Date('2019-02-28 18:33:24');    // null`
复制代码
解决方案是，转成 yyyy/mm/dd hh:mm:ss 这种格式就可以了

replace(/\-/g, "/")
复制代码
2、键盘收起，页面卡住，不回落
ios12上，发现键盘收起的时候，页面会卡主，留下底部一片空白，稍微动一下页面，就会恢复。

这种问题，在网上查了很多解决方案，大致是在blur事件中，让页面滚动一下

window.scrollTo(0, scroll);
复制代码
但是有一个很严重的问题：如果页面上有按钮需要操作 ，例如，评论的输入框+发布按钮，输入完文字，点击“发布”，触发click事件的时候，会导致页面先触发blur事件，键盘回落，然后一切就结束了。。。。按钮点击没有起任何作用。

解决方案： 把click事件更换成ontouchstart 可以解决这个问题。 ontouchstart 事件优于click事件触发

3、ios12在微信小程序的webview，键盘收回，页面底部会留白
这个问题怀疑是页面的scroll设置了auto导致的

解决方案：滚动一下页面，请参考链接，代码有效。 blog.csdn.net/qq_23370345…

4、iphone fix 失效，导致一些机器上textarea光标偏移
解决方案： 所有兄弟元素变成absolute， 父元素overflow:auto;

父元素：
```css
    height: 100vh;
    position: relative;
    overflow: auto;
```
兄弟元素：
```css
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-x: visible;
    overflow-y: auto;
    padding-bottom: 10px;
    z-index: 1;
```
复制代码
5、键盘遮挡输入框
输入框如果使用了fixed固定在底部，键盘顶起的时候，iphone上fixed会失效，导致页面滚动输入框会随着页面滚动，并且在部分机型上，输入框偶尔会被键盘遮挡，这种偶现的问题，很不友好

解决方案： 放弃使用fixed布局，页面如果有滚动，也放弃absolute，如果强行要使用absolute，请参考上一条光标偏移

建议使用flex布局，兼容性会得到解决。

当然，如果遇到以上这些问题，说明产品设计就很不合理，如果必要的话，还是要更换设计，改成input不需要被键盘顶起的设计，这些兼容性的解决方案，也不并不能完美的解决所有机型的问题。