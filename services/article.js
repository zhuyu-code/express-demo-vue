const db=require('../config/db');
let articleFindAll=(userId)=>{
    return new Promise((resolve,reject)=>{
        db.query(`select * from article where userId=${userId}`,(err,rows)=>{
            if(err){
                reject(err);
            }else{
                resolve(rows);
            }
        })
    })
}
let articleAdd=(article)=>{
    return new Promise((resolve,reject)=>{
        db.query(`insert into article (article_title,article_content) values('${article.articleTitle}','${article.articleContent}')`,(err,rows)=>{
            if(err){
                reject(err)
            }else{
                resolve(rows);
            }
        })
    })
}
let articleUpdate=(userId,article)=>{
    return new Promise((resolve,reject)=>{
        db.query(`update article set article_title='${article.articleTitle}',article_content='${article.articleContent}' where userId=${userId}`,(err,rows)=>{
            if(err){
                reject(err)
            }else{
                resolve(rows);
            }
        })
    })
}
let articleDelete=(articleId)=>{
    return new Promise((resolve,reject)=>{
        db.query(`delete from article where article_id=${articleId}`,(err,rows)=>{
            if(err){
                reject(err);
            }else{
                resolve(rows);
            }
        })
    })
}
module.exports={
    articleFindAll,
    articleAdd,
    articleUpdate,
    articleDelete
}