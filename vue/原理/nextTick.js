/* 
nextTick 接收一个回调函数作为参数， 
它的作用是将回调延迟到下次dom更新周期之后，
如果没有回调且在支持Promise的环境中，则返回一个Promise
*/

/* 
应用场景：当更新了数据之后， 需要对新的dom做一些操作，
实际上刚更新数据后，视图不会马上更新，这时我们是获取不到更新后的dom，因为还没有重新渲染
在时候就需要nextTick方法
*/

/* 
在vue.js中，当状态发生变化时，watcher会得到通知， 然后触发虚拟DOM的渲染流程，
而这个操作是异步的，所以存在一个任务队列， 每当需要渲染时， 会将watcher推送到这个队列
，在下次事件循环中再让watcher触发渲染的流程
*/

/* 
事件循环
js是一门单线程非阻塞的语言，说明在执行js代码时会有一个主线程来处理所有任务
而非阻塞是指当代码需要处理异步任务时，主线程会挂起这个任务，当异步任务处理完毕之后
主线程再根据一定规则去执行相应的回调
异步任务有两种类型： 宏任务和微任务
当执行栈中的所有任务都执行完毕后，会去检查微任务队列中是否有事件存在，
如果存在，则会一次执行微任务队列中事件对应的回调，直到为空。
然后去宏任务队列中取出一个事件，把对应的回调加入到当前执行栈，
当执行栈中的所有任务都执行完，检查微任务队列中是否有事件存在。
无限重复此过程，就形成了一个无限循环：事件循环
常见微任务：
Promise.then
MutationObserver
Object.observe
process.nectTick （服务端）
常见宏任务：
setTimeout
setInterval
setImmediate
MessageChannel
requestAnimationFrame
I/O
UI交互事件
*/

/* 
执行栈：
当执行一个方法时，js会生成一个与这个方法对应的执行环境，又叫执行上下文。
这个执行环境中有这个方法的私有作用域、上层作用域的指向、方法参数、私有作用域中
定义的变量以及this对象。这个执行环境会被添加到一个执行栈中，这个栈就是执行栈
*/

/* 
vue原型上的$nextTick方法只是调用了nextTick方法
*/

const callbacks = []
let pending = false
function flushCallbacks () {
  pending = false
  let copies = callbacks.slice(0)
  callbacks.length = 0
  for(let i = 0; i < copies.length; i++){
    copies[i]()
  }
}
let microTimerFunc
let macroTimerFunc
let useMacroTask = false

//判断浏览器支持哪种宏任务
if(typeof setImmediate !== 'undefined' && isNative(setImmediate)){
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  MessageChannel.toString === '[object MessageChannelConstructor]'
)) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} else {
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

// 如果不支持Promise， 直接使用宏任务
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  microTimerFunc = () => {
    p.then(flushCallbacks)
  }
} else {
  microTimerFunc = macroTimerFunc
}

export function withMacroTask (fn){
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true
    const res = fn.apply(null, arguments)
    useMacroTask = false
    return res
  })
}

export function nextTick (cb, ctx) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      cb.call(ctx)
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  if (!pending){
    pending = true
    if (useMacroTask) { // 是否使用宏任务
      macroTimerFunc()
    } else {
      microTimerFunc()
    }
  }
  // 如果没有回调函数，返回一个promise
  if (!cb && typeof Promise !== 'undefined'){
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}

// 是否是原生方法
export function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}