/*
import
即es6 module

1. 运用闭包的作用
2. 为了创建module的内部作用域， 会调用一个包装函数
3. 包装函数的返回值也就是module向外公开的api， 也就是拿到module导出变量的引用

*/

/*
与require的不同
commonjs模块输出的是一个值的拷贝， es6模块输出的是值的引用
commonjs模块是运行时加载， es模块是编译是输出接口
*/

/*
commonjs是运行是加载对应模块， 一旦输出一个值即使模块内部对其做出改变，也不会影响输出值
如：
*/
// a.js
var a = 1
function changeA(val){
  a = val
}
module.exports = {
  a,
  changeA
}

// b.js
var modA = require('./a.js')
console.log(modeA.a) // 1
modA.changeA(2)
console.log(modeA.a) // 1