<!--
 * @Descripttion:
 * @version:
 * @Author: shetia
 * @Date: 2019-08-18 23:40:37
 * @LastEditors: somebody
 * @LastEditTime: 2019-08-18 23:41:13
 -->

##获取本机 ip

```js
function getIps() {
  const os = require('os'); //获得当前可用网络  os 模块提供了一些基本的系统操作函数
  let ifaces = os.networkInterfaces(); //获得网络接口列表。
  let isWin = os.type() === 'Windows_NT';  //返回操作系统名
  let arr = [];
  for (let dev in ifaces) {
    ifaces[dev].forEach(function(details) {
      if (details.family == 'IPv4') {
        arr.push(details.address);
      }
    });
  }
  return isWin ? arr[0] : arr[1];
}
```
