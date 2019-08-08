const fs = require('fs')
const path = require('path')
const filedir = './test'
fs.watch(filedir,function(type,file){
  let arr = []
  travel(filedir)
  concat(arr)

  function travel(dir){
    fs.readdirSync(dir).forEach(function(file){
      let pathname = path.join(dir,file)
      if(fs.statSync(pathname).isDirectory()){
        travel(pathname)
      }else{
        arr.push(pathname)
      }
    })
  }
  function concat(arr){
    let content = ''
    arr.forEach(function(item){
      let c = fs.readFileSync(item)
      content += c.toString() + '\n'
    })
    fs.writeFile('./res.js',content,{},()=>{
      console.log('change success!')
    })
  }

  // 写入成功后读取测试
  fs.readFile('./res.js', 'utf-8', function(err, data) {
    if (err) {
        throw err
    }
    console.log('修改后的数据：\n'+data)
  })
})
console.log('watch test...')