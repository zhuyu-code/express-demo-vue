var express=require('express');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var passport=require('passport');

var router=express.Router();
const usersService=require('../services/users');
//注册接口
router.post('/register',async(req,res,next)=>{
    console.log(req.body);
    //查询数据库是否具有相同的email
    let isUserEmail=await usersService.userFindOne(req.body.email);
    if(isUserEmail.length!==0){
        res.status(404).json({message:"邮箱已经被注册了"})
    }else{
        console.log(req.body);
        const User={
            email:req.body.email,
            userName:req.body.userName,
            password:req.body.password
        }
        bcrypt.hash(User.password, 10, async function(err, hash) {
            if (err) throw err;
            User.password=hash;
            let result=await usersService.register(User);
             if(result.affectedRows==1){
            res.status(200).json({message:"注册成功"})
         }
        });
    } 
})
//登录接口
router.post('/login',async(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    //查询email是否存在
    const isUserEmail=await usersService.userFindOne(email);  
    if(isUserEmail.length===0){
        res.status(404).json({message:"你所登录的用户不存在"})
    }
    
    //使用bcrypt解密验证密码是否错误
    bcrypt.compare(password, isUserEmail[0].password).then(function(result) {
        if(result){
            const rule={id:isUserEmail[0].userId,userName:isUserEmail[0].userName}
            jwt.sign(rule,'secret',{expiresIn:86400},(err,token)=>{
                if(err) throw err;
                res.json({message:"登录成功",token:'Bearer '+token});
            })
        }else{
            res.json({message:"密码错误"})
        }
    });
})

//使用token做身份校验，passport,passport-jwt;
router.post('/main',passport.authenticate("jwt",{session:false}),async(req,res,next)=>{
    res.json(req.user);

})

module.exports=router;