let callbacks = []
let pending = false
let runCb = () => {
  pending = false
  let arr = callbacks.slice(0)
  callbacks.length = 0 // 清空
  arr.forEach(fn => fn())
}
let promise = Promise.resolve()
let microFn = function(){
  promise.then(runCb)
}
function nextTick(cb, ctx){
  callbacks.push(() => {
    if (cb) {
      cb.call(ctx)
    }
  })
  if (!pending) {
    pending = true
    microFn()
  }
}

// 测试
setTimeout(() => {
  console.log('宏任务')
},0)
nextTick(() => {
  console.log('nextTick1')
})
console.log('主线任务')
Promise.resolve().then(() => {
  console.log('微任务then')
})
nextTick(() => {
  console.log('nextTick2')
})