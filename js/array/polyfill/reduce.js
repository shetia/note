// Production steps of ECMA-262, Edition 5, 15.4.4.21
// Reference: http://es5.github.io/#x15.4.4.21
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce

// if(!Array.prototype.reduce){
  Object.defineProperty(Array.prototype, '_reduce', {
    value: function (callback) {
      if (this === null) {
        throw new TypeError( 'Array.prototype.reduce called on null or undefined' );
      }
      if (typeof callback !== 'function') {
        throw new TypeError( callback + ' is not a function');
      }
      var o = Object(this)
      var len = o.length >>> 0
      var k = 0
      var value
      if (arguments.length >= 2){
        value = arguments[1]
      } else {
        while( k < len && !(k in o)){
          k++
        }
        if (k >= len) { // 空数组但没有初始值
          throw new TypeError( 'Reduce of empty array with no initial value')
        }
        value = o[k++]
      }
      while( k < len ) {
        if (k in o) {
          value = callback(value, o[k], k, o)
        }
        k++
      }
      return value
    }
  })
// }

let arr = [1,2,3,4,5]
console.log(arr._reduce((a, b) => a + b)) // 15