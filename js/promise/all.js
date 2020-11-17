/* 
Promise.all()的类型签名:

Promise.all<T>(promises: Iterable<Promise<T>>): Promise<Array<T>>
返回情况：

完成（Fulfillment）：
如果传入的可迭代对象为空，Promise.all 会同步地返回一个已完成（resolved）状态的promise。
如果所有传入的 promise 都变为完成状态，或者传入的可迭代对象内没有 promise，Promise.all 返回的 promise 异步地变为完成。
在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组，它包含所有的传入迭代参数对象的值（也包括非 promise 值）。

失败/拒绝（Rejection）：
如果传入的 promise 中有一个失败（rejected），Promise.all 异步地将失败的那个结果给失败状态的回调函数，而不管其它 promise 是否完成。
*/

Promise._all = function (iterable) {
  return new Promise((resolve, reject) => {
    let res = []
    let index = 0
    let len = iterable.length
    let fn = (i, item) => {
      index++
      res[i] = item
      if (index === len) {
        resolve(res)
      }
    }
    for(let i = 0; i < len; i++) {
      if (iterable[i].then) {
        iterable[i].then(res => {
          fn(i, res)
        }, reject)
      } else {
        fn(i, iterable[i])
      }
    }
    if (len === 0) {
      resolve([])
    }
  })
}

const promises = [
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('成功1'), 1000)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('成功2'), 1500)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('成功3'), 2000)
  }),
  '123'
]

Promise._all(promises).then(res => {
  console.log(res)
}).catch(e => {
  console.log(e)
})