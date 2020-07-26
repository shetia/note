/*
 * @Descripttion:
 * @version:
 * @Author: shetia
 * @Date: 2020-07-14 21:00:42
 * @LastEditors: somebody
 * @LastEditTime: 2020-07-14 21:12:19
 */
// 观察者模式 vue 特点 数据变化 更新视图 监控数据的变化 数据变化后需要更新视图

// 被观察者
class Subject {
  constructor(name){
    this.arr = []
    this.state = '睡觉'
    this.name = name
  }
  attach (er) {
    this.arr.push(er)
  }
  setState (newState) {
    this.state = newState
    this.arr.forEach(er => er.update(newState, this.name))
  }
}

// 观察者
class Observer {
  constructor(name){
    this.name = name
  }
  update(state, name){
    console.log(`${this.name}: ${name}发生动作: ${state}`)
  }
}

let son1 = new Subject('宝宝1')
let son2 = new Subject('宝宝2')
let father = new Observer('爸爸')
let mom = new Observer('妈妈')
son1.attach(father)
son2.attach(mom)
son1.setState('醒了')
son2.setState('尿尿了')