# 封装api

通常vue项目请求接口通用方案都得封装一层axios, 可以借鉴, 具体根据不同项目调整

## 目录结构

```
|--|
|--api
|  |--index.js  // 统一出口
|  |--shop.js   // 业务
|--request
|  |--axios.js  // axios基本配置, 拦截
|  |--index.js  // 封装

```

## 具体文件

```js
// api/index.js
import shop from './shop'
import serve from '../request/index'
serve.put('shop', shop)
export default serve
```

```js
// api/shop.js
export default {
  list: 'api/list'
}
```

```js
//request/axios.js
import axios from 'axios';
let serve = axios.create({
  baseURL: '/',
  timeout:5000
})
export default serve
```

```js
//request/index.js
import serve from './axios'

class MyServer {
  constructor(){
    this.serve = serve
    this.vm = null
  }
  v (vm) {
    this.vm = vm  // 当前组件
  }
  put (name, obj) {
    this[name] = {};
    Object.keys(obj).forEach(apiName => {
      this[name][apiName] = this.send.bind(this, name, apiName, obj[apiName])
      this[name][apiName].state = 'ready'
    })
  }
  send(name, apiName, url, config) {
    return new Promise((resolve, reject) => {
      var config = config || {};
      var type = config.type || 'get'
      var data = config.data || {};
      var bindName = config.bindName || ''
      var self = this
      var after = function (res){ // 请求完恢复可以提交的状态
        self[name][apiName].state = 'ready'
        return res
      }
      var defaultFn = function(res){ // 绑定数据
        self.vm && bindName && (self.vm[bindName] = res.data)
      }
      var success = config.success || defaultFn
      if (self[name][apiName].state == 'ready') { // 防止重复提交
        self[name][apiName].state = 'waiting'
        self.serve[type](url, data).then(after).then((res) => {
          success(res) // 结果用回调处理也行用then也行
          resolve(res)
        }).catch(reject)
      }
    })
  }
}

export default new MyServer()
```

## 使用

```js
// vue组件
<script>
import qa from '../api/index.js';
export default {
  data () {
    return {
      list: []
    }
  },
  mounted () {
    qa.v(this)
  },
  methods: {
    getList () {
      qa.shop.list({
        bindName: 'list'
      })
    }
  }
}
</script>
```