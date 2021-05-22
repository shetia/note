// ----------------参考答案开始-------------------------
class Scheduler{
  constructor(){
    this.runing = []  // 正在运行中的
    this.pending = [] // 待运行的
  }
  add (promise) {
    return new Promise((resolve, reject) => {
      promise.resolve = resolve
      if (this.runing.length < 2){
        this.run(promise)
      } else {
        this.pending.push(promise)
      }
    })
  }
  run (promise) {
    this.runing.push(promise)
    promise().then(() => {
      promise.resolve()
      this.remove(promise)           // 执行完删除该promsie
      if (this.pending.length > 0) { // 如果还有待执行的继续执行
        this.run(this.pending.shift())
      }
    })
  }
  remove(promise) {
    let index = this.runing.indexOf(promise)
    this.runing.splice(index, 1)
  }
}
// --------------参考答案结束---------------







// 题目： 实现Scheduler
const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})

const scheduler = new Scheduler() // Scheduler待实现
const addTask = (time, order) => {
  scheduler.add(
    () => timeout(time)
  ).then(() => console.log(order))
}

// 要求： 限制同一时刻只能执行2个task
addTask(4000, '1')
addTask(3500, '2')
addTask(4000, '3')
addTask(3000, '4')
//Scheduler ？
//4秒后打印1
//3.5秒打印2
//3进入队列，到7.5秒打印3
//4进入队列， 到7秒打印4
//...