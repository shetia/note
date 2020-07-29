/*
 * @Descripttion:
 * @version:
 * @Author: shetia
 * @Date: 2020-07-14 21:13:33
 * @LastEditors: somebody
 * @LastEditTime: 2020-07-14 21:21:22
 */
// 发布emit和订阅on   发布和订阅之间没有任何关系
let event = {
  arr: [],
  on(fn){
    this.arr.push(fn)
  },
  emit(){
    this.arr.forEach(fn => fn())
  }
}
let school = {}
event.on(function(){
  console.log('绑定一次', school)
})
event.on(function(){
  console.log('绑定两次', school)
})
setTimeout(() => {
  school.name = '桂工'
  event.emit()  // 触发
}, 2000)
setTimeout(() => {
  school.age = '100'
  event.emit()

}, 5000)

