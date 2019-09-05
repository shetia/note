## vue配合mint使用弹框底部滚动问题


在mt-popup组件上添加@touchmove.native.stop.prevent
```html
<mt-popup
        v-model="isShowPop"
        position="bottom"
        @touchmove.native.stop.prevent> 

        <!-- 内容 -->
    </mt-popup>

```

注意当mt-popup中还有div等子元素的时候，一定要注意，这个时候可能会有一些问题，会出现mt-popup这个元素也滚动不了的情况，所以说如果mt-popup本身不需要滚动的话，加了@touchmove.native.stop.prevent，底部页面就不会跟着滑动，如果mt-popup里面有滚动条需要滚动的话，可能就滚动不了，这个时候需要采取常规方法了，如下：
// 解决方式，通过监听popupVisible变量,在弹窗出现后禁止body节点touchMove事件，弹窗消失后恢复body节点的touchMove事件 

```html
//html 如下
 <mt-popup
      v-model="popupVisible"
      position="bottom">
      ...
 </mt-popup>
 ```
 ```js
// js 如下
const handler = function(e) {
    e.preventDefault();
}

// vue实例内
watch: {
    popupVisible: function (val) {
      if(val) {
          document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, { passive: false });
      } else {
          document.getElementsByTagName('body')[0].addEventListener('touchmove', this.handler, { passive: false });
      }
    }
} 

```

对于时间组件加了@touchmove.native.stop.prevent，选择时间滚动的时候底部页面就不会跟着滚动了，很完美。
Datetime Picker：
```html
<mt-datetime-picker
    ref="picker"
    type="time"
    v-model="pickerValue"
    @touchmove.native.stop.prevent>
</mt-datetime-picker>
```
