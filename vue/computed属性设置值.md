# 设置值

```js
  computed: {
    // 一般来讲computed属性 赋值会报错, 要自己设置setter, 如下
    dateInterval: {
      set(newV) {
        // 设置值得操作...  不能自己设置自己, 会死循环
        let [start, end] = newV
        start = moment(start).format('YYYY-MM-DD')
        end = moment(end).format('YYYY-MM-DD')
        this.detailData.BGNDT = start
        this.detailData.ENDDT = end
      },
      get() {
        // 获取值的操作...
        return [this.detailData.BGNDT, this.detailData.ENDDT]
      }
    }
  },
```
