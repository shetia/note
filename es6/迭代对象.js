let obj = {
  0: 0,
  1: 10,
  2: 20,
  3: 30,
  a: 'a',
  b: 'b',
  length: 6,
  // [Symbol.iterator]:Array.prototype[Symbol.iterator]
  [Symbol.iterator]: function () {
    let self = this
    let index = 0
    return {
      next(){
        if(index > self.length - 1){
          return {
            value: undefined,
            done: true
          }
        }
        return {
          value: self[index++],
          done: false
        }
      }
    }
  }
}
for(let item of obj){
  console.log(item)
}