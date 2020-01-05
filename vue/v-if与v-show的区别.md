## v-if v-show 的原理

```html
<div id="root"> 
  <div v-if="true">
    我是指令v-if
    <span v-if='false'>看不见我</span>
  </div>
  <div v-if="false">我是指令v-if隐藏</div>
  <div v-show="true">我是指令v-show</div>
  <div v-show="false">我是指令v-show</div>
</div>
```
```js
  let el = document.getElementById('root');
  (function dealNode(el){ 
    let childNodes = [...el.childNodes]     // 所有子节点
    childNodes.forEach(item=>{              // 遍历拿到每一个元素
      if(item.nodeType === 1){              //选出属于元素的节点  
        let attrs = [...item.attributes]
        attrs.forEach(subItem =>{         // 遍历拿到每一个属性
          let name = subItem.name
          let value = subItem.value
          let deretiveName = name.substring(2) 
          if(name.indexOf('v-')>-1){      // 判断该属性是否包含 v-
            if(deretiveName==='if'&&value === 'false'){ 
              let newNode = document.createComment('我是v-if隐藏') // 生成一个注释节点
              item.parentNode.replaceChild(newNode,item)          // 然后用注释替换掉原来的节点
            }else if(deretiveName==='show'&&value === 'false'){
              item.style.display = 'none'
            }

            if(item.childNodes.length>1){
              // 如果有子节点 递归调用
              dealNode(item)
            }
          }
        }) 
      }
    }) 
  })(el)
 
```