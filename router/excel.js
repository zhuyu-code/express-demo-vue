const express=require('express');
const router=express.Router();
//引入fs模块
const fs = require('fs')
//引入excel模块
var excelPort = require('excel-export');
//引入表内容
const excelService=require('../services/excel');
router.get('/zhuyu',async (req,res,next)=>{
    
const write = function(datas){
    //定义一个对象，存放内容
    var conf = {};
    //定义表头
    conf.cols = [
       {caption:'文章Id', type:'number', width:20},
       {caption:'文章标题', type:'string', width:40},
       {caption:'文章内容', type:'string', width:20},
       {caption:'时间', type:'string', width:40},
    ];
    //创建一个数组用来多次遍历行数据
    var array = [];
    // 循环导入从数据库中获取的表内容
    for (var i=0;i<datas.length;i++){
        //依次写入
        array[i] = [
            datas[i].article_id,
            datas[i].article_title,
            datas[i].article_content,
            datas[i].article_start,
        ];
    }
    //写入道conf对象中
    conf.rows = array;
    //生成表格
    var result = excelPort.execute(conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
  	res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
  	res.end(result, 'binary');
    // 定义表格存放路径
    fs.writeFile('util/util.xlsx', result, 'binary',function(err){
        if(err){
            console.log(err);
        }
    });
}

//调取数据方法
    
    const result=await excelService.excelExpend();
    write(result);
    // fs.readFile('util/util.xlsx',  (err, data)=> {
    //     if (err) throw err
    //     console.log('isBuffer: ' + Buffer.isBuffer(data)) // isBuffer: true
    //     console.log(data) // <Buffer 72 6f ... >
    //     res.send(Buffer.isBuffer(data))
    //   })
})
module.exports=router