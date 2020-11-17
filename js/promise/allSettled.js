/* 
Promise.allSettled()方法返回一个promise，
该promise在所有给定的promise已被解析或被拒绝后解析，并且每个对象都描述每个promise的结果。
*/
Promise._allSettled = function (iterable) {
  return new Promise((resolve, reject) => {
    try{
      let res = []
      let index = 0
      let len = iterable.length
      let fn = function (i, item) {
        res[i] = item
        index++
        if (index === len) {
          resolve(res)
        }
      }
      for (let i = 0; i < len; i++){
        iterable[i].then(res => {
          fn(i, {
            status: 'fulfilled',
            value: res
          })
        }, err => {
          fn(i, {
            status: 'rejected',
            reason: err
          })
        })
      }
      if (len === 0) {
        resolve([])
      }
    } catch(e){
      reject(e)
    }
  })
}


const promises = [
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('成功1'), 1000)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => reject('失败2'), 1500)
  }),
  new Promise((resolve, reject) => {
    setTimeout(() => resolve('成功3'), 2000)
  }),
]
console.log('-----------开始-----------')
Promise._allSettled(promises).then(res => {
  console.log('-----------结果-----------')
  console.log(res)
})


/* 
写法2:
*/

const formatSettledResult = (isOk, res) => 
isOk ?
  {status: 'fulfilled', value: res} :
  {status: 'rejected', reason: res}

Promise.all_settlted = function(iterators) {
  const promises = Array.from(iterators)
  const num = promises.length
  const res = Array(num)
  let index = 0
  return new Promise((resolve, reject) => {
    let fn = (i, value) => {
      index++
      res[i] = value
      if (index === num) resolve(res)
    }
    promises.forEach((t, i) => {
      Promise.resolve(t).then(value => {
        fn(i, formatSettledResult(true, value))
      }, err => {
        fn(i, formatSettledResult(false, err))
      })
    })
  })
}
Promise.all_settlted(promises).then(res => {
  console.log('-----------结果-----------')
  console.log(res)
})