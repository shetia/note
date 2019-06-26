### vue监听窗口变化
#### 方案一
第一步： 先在 data 中去 定义 一个记录宽度是 属性
```js
	data: {
    screenWidth: document.body.clientWidth   // 这里是给到了一个默认值 （这个很重要）
}
```
第二步： 我们需要 讲 reisze 事件在 vue mounted 的时候 去挂载一下它的方法
```js
        mounted () {
            const that = this
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth
                    that.screenWidth = window.screenWidth
                })()
            }
        }
```
第三步： watch 去监听这个 属性值的变化，如果发生变化则讲这个val 传递给 this.screenWidth
```js
	        watch: {
                screenWidth (val) {
                    this.screenWidth = val
                }
        }
```
第四步：优化 因为 频繁 触发 resize 函数，导致页面很卡的 问题
```js
    watch: {
        screenWidth (val) {
            if (!this.timer) {
                this.screenWidth = val
                this.timer = true
                let that = this
                setTimeout(function () {
                    // that.screenWidth = that.$store.state.canvasWidth
                    console.log(that.screenWidth)
                    that.init()
                    that.timer = false
                }, 400)
            }
        }
    }
```
#### 方案二：

在vue 2.x 里面的时候，可以在 mounted 钩子中 全局监听 resize 事件，然后绑定的函数再做具体的处理。
