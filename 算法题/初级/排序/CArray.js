/*
 * @Descripttion:
 * @version:
 * @Author: shetia
 * @Date: 2020-04-21 22:02:26
 * @LastEditors: somebody
 * @LastEditTime: 2020-04-21 23:18:27
 */
/*
数组测试平台，它将辅助我们完成基本排序算法的研究。我们将创
建一个数组类和一些封装了常规数组操作的函数：插入新数据，显示数组数据及调用不同
的排序算法。这个类还包含了一个 swap() 函数，用于交换数组元素。
*/
class CArray {
  constructor(numElements){
    this.dataStore = []
    this.pos = 0;
    this.numElements = numElements
    // this.insert = insert
    // this.toString = toString
    // this.clear = clear
    // this.setData = setData
    // this.swap = swap
    for(let i = 0; i < numElements; i++){
      this.dataStore[i] = i
    }
  }
  setData () {
    for (let i = 0; i < this.numElements; i++){
      this.dataStore[i] = Math.floor(Math.random() * (this.numElements + 1))
    }
  }
  clear () {
    for (let i = 0; i < this.numElements; i++){
      this.dataStore[i] = 0
    }
  }
  insert (element) {
    this.dataStore[this.pos++] = element
  }
  toString () {
    let restr = ''
    for (let i = 0; i < this.dataStore.length; i++){
      restr += this.dataStore[i] + ' '
      if(i > 0 && i % 10 ===0){
        restr += '\n'
      }
    }
    return restr
  }
  swap (arr, index1, index2) {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]]
  }
  // 冒泡排序
  bubbleSort () {
    let len = this.dataStore.length
    for(let i = len; i >= 2; i--){
      for(let j = 0; j <= i - 1; j++){
        if(this.dataStore[j] > this.dataStore[j + 1]){
          this.swap(this.dataStore, j, j + 1)
        }
      }
      // console.log(this.toString(), '-----------', i)
    }
  }
  // 选择排序
  /*
   选择排序从数组的开头开始，将第一个元素和其他元素进行比较。
   检查完所有元素后，最小的元素会被放到数组的第一个位置,然后算法会从第二个位置继续。
   这个过程一直进行，当进行到数组的倒数第二个位置时，所有的数据便完成了排序。
  */
  selectionSort () {
    let len = this.dataStore.length
    for(let i = 0; i < len - 1; i++){
      for(let j = i + 1; j < len; j++){
        if(this.dataStore[i] > this.dataStore[j]){
          this.swap(this.dataStore, i, j)
        }
      }
    }
  }
 /*
  插入排序
  插入排序类似于人类按数字或字母顺序对数据进行排序
  插入排序有两个循环。外循环将数组元素挨个移动，而内循环则对外循环中选中的元素及
它后面的那个元素进行比较。如果外循环中选中的元素比内循环中选中的元素小，那么数
组元素会向右移动，为内循环中的这个元素腾出位置，
 */
  insertionSort () {
    for (let i = 1; i < this.dataStore.length; i++){
      let item = this.dataStore[i]
      let j = i
      while(j > 0 && (this.dataStore[j - 1] >= item)){
        this.dataStore[j] = this.dataStore[j - 1]
        j--
      }
      this.dataStore[j] = item
      // console.log(this.toString(), '------------', i)
    }
  }
}

export default CArray