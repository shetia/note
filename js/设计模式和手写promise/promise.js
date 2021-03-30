/*
 * @Descripttion:
 * @version:
 * @Author: shetia
 * @Date: 2020-07-16 20:14:51
 * @LastEditors: somebody
 * @LastEditTime: 2020-07-24 22:28:45
 */
// 有三个状态
const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
// 所有的promise都遵循这个规范, 规定这里的写法应该兼容所有promise
const resolvePromise = (promise2, x, resolve, reject) => {
  if(promise2 === x) {
    // 抛出循环引用
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  // 判断数据类型
  if(typeof x === 'object' && x !== null || typeof x === 'function') {
    let called  // 内部测试的时候, 会成功和失败都调一下
    try{
      let then = x.then
      if(typeof then === 'function'){ // 有then方法就认为是promise
        then.call(x, (y) => { // y 可能还是promise, 直到解析出来的是普通值
          if(called){
            return
          }
          called = true
          // 采用promise的成功结果向下传递
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          if(called){
            return
          }
          called = true
          reject(r)
        }) // 保证不用再次
      } else {
        // x 是一个普通的对象
        resolve(x)
      }
    } catch (e) {
      if(called){
        return
      }
      called = true
      reject(e)
    }
  } else {
    // x是普通值
    resolve(x)
  }
  // 判断x的值
}
class Promise{
  constructor(executor){
    this.status = PENDING
    this.value = ''
    this.reason = ''
    this.successList = []
    this.errorList = []
    let resolve = (value) => {
      if(this.status === PENDING){
        this.value = value
        this.status = RESOLVED
        this.successList.forEach(fn => fn())
      }
    }
    let reject = (reason) => {
      if(this.status === PENDING){
        this.status = REJECTED
        this.reason = reason
        this.errorList.forEach(fn => fn())
      }
    }
    try{
      executor(resolve, reject)
    } catch(e){
      reject(e)
    }
  }
  then(onfulfilled, onrejected){
    // onfulfilled, onrejected 是可选的
    onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : data => data
    onrejected = typeof onrejected === 'function' ? onrejected : err => {
      throw err
    }
    let promise2 = new Promise((resolve, reject) => {
      // 同步
      if(this.status === RESOLVED){
        setTimeout(() => {
          try {
            let x = onfulfilled(this.value)
            // x 可能是普通值 可能是promise
            // 判断x值 => promise2的状态
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if(this.status === REJECTED){
        setTimeout(() => {
          try {
            let x = onrejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      // 异步情况
      if(this.status === PENDING){
        this.successList.push(() => {
          setTimeout(() => {
            try {
              let x = onfulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.errorList.push(() => {
          setTimeout(() => {
            try {
              let x = onrejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })
    return promise2
  }
}
// 延迟对象 测试入口 终端运行命令: promises-aplus-tests promise.js  会测试promise写的是否符合规范
Promise.defer = Promise.deferred = function () {
  let pd = {}
  pd.promise = new Promise((resolve, reject) => {
    pd.resolve = resolve
    pd.reject = reject
  })
  return pd
}

// 判断是否是promise
const isPromise = function(value) {
  if(typeof value === 'object' && value !== null || typeof value === 'function'){
    if(typeof value.then === 'function'){
      return true
    }
  }
  return false
}
Promise.all = function(values){
  return new Promise((resolve, reject) => {
    let arr = []
    let index = 0 // 解决多个异步并发问题
    function processData (key, value) {
      index++
      arr[key] = value
      if(index === values.length){
        resolve(arr)
      }
    }

    for(let i = 0; i < values.length; i++){
      let current = values[i]
      if(isPromise(current)){
        current.then(data => {
          processData(i, data)
        }, reject)
      } else {
        processData(i, current)
      }
    }
  })
}
Promise.resolve = function(value) {
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}
Promise.reject = function(value){
  return new Promise((resolve, reject) => {
    reject(value)
  })
}
module.exports = Promise