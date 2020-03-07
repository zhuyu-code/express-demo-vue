const db=require('../config/db');
let excelExpend=()=>{
    return new Promise((resolve,reject)=>{
        db.query('select * from article',(err,rows)=>{
            if(err){
                reject(err)
            }else{
                resolve(rows);
            }
        })
    })
}
module.exports={
    excelExpend
}