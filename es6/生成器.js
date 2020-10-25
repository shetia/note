// 模拟 async / await

function AsyncFunc (generator) {
  let iterator = generator()
  let next = x => {
      let {value, done} = iterator.next(x)
      if(done) return
      value.then(x => next(x))
  }
  next()
}

function func1(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('你是谁')
    }, 2000)
  })
}
function func2(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('你从哪里来')
    }, 2000)
  })
}
function func3(){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('你要去哪里')
    }, 2000)
  })
}

AsyncFunc(function* () {
  let x = yield func1()
  console.log(x)
  x = yield func2()
  console.log(x)
  x = yield func3()
  console.log(x)
})