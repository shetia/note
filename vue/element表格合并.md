
使用element的table 相同行列合并
```js
rowspan() {
        this.spanArr = [];//在data里面定义
        this.position = 0; //在data里面定义
        this.tableData1.forEach((item,index) => {
          if( index === 0){
            this.spanArr.push(1);
            this.position = 0;
            item.sequence=index+1;//设置序号
          }else{
            if(this.tableData1[index].projectName === this.tableData1[index-1].projectName ){
              this.spanArr[this.position] += 1;//连续有几行项目名名称相同
              this.spanArr.push(0); // 名称相同后往数组里面加一项0
              console.log(this.spanArr)
              //当项目名称相同时，设置当前序号和前一个相同
              this.tableData1[index].sequence = this.tableData1[index-1].sequence;
            }else{
              this.spanArr.push(1);
              this.position = index;
              //当项目名称不同时，将当前序号设置为前一个序号+1
              this.tableData1[index].sequence = this.tableData1[index-1].sequence+1;
            }
          }
        })
      },


      objectSpanMethod({ row, column, rowIndex, columnIndex }) {  //表格合并行
        if(columnIndex === 0){  //序号列也进行合并(第一列)
          //this.spanArr这个数组里面存的是table里面连续的有几条数据相同
          //例如:[1,1,2,0,2,0]
          //1  代表的没有连续的相同的
          //2  代表连续的两个相同
          //0  代表是和上一条内容相同
          const _row = this.spanArr[rowIndex];
          const _col = _row>0 ? 1 : 0;
          console.log("ppp")
          console.log(_row)
          console.log(_col)
          return {
            rowspan: _row, //行
            colspan: _col  //列
          }

        }
        if(columnIndex === 1){ //项目列也进行合并(第二列)
          const _row = this.spanArr[rowIndex];
          const _col = _row>0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
```