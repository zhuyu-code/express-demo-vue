const db = require('../config/db');
let profileFindOne=(profileId)=>{
    return new Promise((resolve,reject)=>{
        db.query(`select * from profile where profileId=${profileId}`,(err,rows)=>{
            if(err){
                reject(err);
            }else{
                resolve(rows)
            }
        })
    })
}
let profileFindAll=()=>{
    return new Promise((resolve,reject)=>{
        db.query(`select * from profile`,(err,rows)=>{
            if(err){
                reject(err);
            }else{
                resolve(rows)
            }
        })
    })
}
let profileAdd=(profile)=>{
    return new Promise((resolve,reject)=>{
        db.query(`INSERT INTO profile (type,description,income,expend,cash,remark) VALUES  ('${profile.type}', '${profile.description }', '${profile.income}', '${profile.expend}', '${profile.cash}','${profile.remark}');`,(err,rows)=>{
            if(err){
                reject(err)
            }else{
                resolve(rows)
            }
        })
    })
}
let profileUpdate=(profileId,profile)=>{
    return new Promise((resolve,reject)=>{
        db.query(`Update profile set type='${profile.type}',description='${profile.description}',income='${profile.income}',expend='${profile.expend}',cash='${profile.cash}',remark='${profile.remark}' where profileId=${profileId};`,(err,rows)=>{
            if(err){
                reject(err)
            }else{
                resolve(rows)
            }
        })
    })
}
let profileDeleteId=(profileId)=>{
    return new Promise((resolve,reject)=>{
        db.query(`delete from profile where profileId='${profileId}'`,(err,rows)=>{
            if(err){
                reject(err);
            }else{
                resolve(rows)
            }
        })
    })
}
module.exports={
    profileAdd,
    profileFindAll,
    profileFindOne,
    profileUpdate,
    profileDeleteId
}