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
  const os = require('os'); //获得当前可用网络
  let ifaces = os.networkInterfaces();
  let isWin = os.type() === 'Windows_NT';
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
