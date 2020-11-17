/* 
Promise.race(iterable) 方法返回一个 promise，
一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
*/

Promise._race = function(iterable){
  return new Promise((resolve, reject) => {
    let flag = false
    for(let item of iterable) {
      item.then(res => {
        if (flag) return
        flag = true
        resolve(res)
      }, err => {
        if (flag) return
        flag = true
        reject(err)
      })
    }
  })
}

const promises = [
  // new Promise((resolve, reject) => {
  //   setTimeout(() => resolve('成功1'), 1000)
  // }),
  // new Promise((resolve, reject) => {
  //   setTimeout(() => reject('失败2'), 800)
  // }),
  // new Promise((resolve, reject) => {
  //   setTimeout(() => resolve('成功3'), 2000)
  // }),
]
console.log('-----------开始-----------')
Promise._race(promises).then(res => {
  console.log(res, 123)
}).catch(e => {
  console.log(e, 333)
})