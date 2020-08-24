### 可拖动悬浮图标

```js
<template>
  <div>
    <div class="ai-robot"
      @touchstart="robotDown"
      @mousedown="robotDown"
      @mousemove="robotMove"
      @touchmove="robotMove"
      @mouseup="robotUp"
      @touchend="robotUp"
      ref="aiRobotRef">
      </div>
  </div>
</template>

<script>
function bodyScroll (event) {
  event.preventDefault()
}
export default {
  data () {
    return {
      position: {     // 机器人部分
        x: '',
        y: ''
      },
      robotX: '',
      robotY: '',
      isRobotDown: false
    }
  },
  // mounted () {
  //   window.addEventListener('mouseup', this.robotUp)
  //   window.addEventListener('mousemove', this.robotMove)
  // },
  // beforeDestroy () {
  //   window.removeEventListener('mouseup', this.robotUp)
  //   window.removeEventListener('mousemove', this.robotMove)
  // },
  methods: {
    robotDown (e) {
      this.isRobotDown = true
      let touch = e
      if (e.touches) {
        touch = event.touches[0]
      }
      this.position.x = touch.clientX
      this.position.y = touch.clientY
      this.robotX = this.$refs.aiRobotRef.offsetLeft
      this.robotY = this.$refs.aiRobotRef.offsetTop
    },
    robotMove (e) {
      if (!this.isRobotDown) return
      let touch = e
      if (e.touches) {
        touch = event.touches[0]
      }
      let diffeX = this.robotX + touch.clientX - this.position.x
      let diffeY = this.robotY + touch.clientY - this.position.y
      let robotDom = this.$refs.aiRobotRef
      // 超出边界
      let screenX = document.documentElement.clientWidth
      let screenY = document.documentElement.clientHeight
      let robotW = this.$refs.aiRobotRef.offsetWidth
      let robotH = this.$refs.aiRobotRef.offsetHeight
      let boundaryL = touch.clientX - (this.position.x - this.robotX)
      let boundaryT = touch.clientY - (this.position.y - this.robotY)
      let boundaryR = touch.clientX + (this.robotX + robotW - this.position.x)
      let boundaryB = touch.clientY + (this.robotY + robotH - this.position.y)
      if (boundaryL < 0) {
        diffeX = 0
      } else if (boundaryR > screenX) {
        diffeX = screenX - robotW
      }
      if (boundaryT < 0) {
        diffeY = 0
      } else if (boundaryB > screenY) {
        diffeY = screenY - robotH
      }
      robotDom.style.left = diffeX + 'px'
      robotDom.style.top = diffeY + 'px'
      // 阻止页面的滑动默认事件；如果碰到滑动问题，1.2 请注意是否获取到 touchmove
      document.body.addEventListener('touchmove', bodyScroll, { passive: false })
    },
    robotUp (e) {
      this.isRobotDown = false
      document.body.removeEventListener('touchmove', bodyScroll, { passive: false })
    }
  }
}
</script>

<style lang='scss' scoped>
  // 机器人
  .ai-robot{
    cursor: pointer;
    position:fixed;
    top:70%;
    right:10px;
    width:50px;
    height:59px;
    background-image:url('~@/assets/images/robot.png');
    background-size:100% 100%;
    z-index: 99999;
    outline: none;
  }
</style>
```