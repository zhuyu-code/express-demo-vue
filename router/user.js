var express = require('express');
const bcrypt = require('bcrypt');
var router = express.Router();
var userService=require('../services/user');
//获取全部用户信息
router.get('/show',async(req,res,next)=>{
    let result=await userService.showUser();
    res.json(result);
})
//根据Id获取用户信息
router.get('/select/:userId', async (req, res) => {
    try {
        const userId=req.params.userId;
        let result = await userService.selectUser(userId);
        res.send(result);
    } catch (e) {
      res.send(e);
    }
  })
//插入用户信息
router.post('/insert', async (req, res, next) => {
  try {
    console.log(req.body);
      const User={
        userName:req.body.userName,
        email:req.body.email,
        password:req.body.password,
      }
      console.log("第一"+User.password)
    bcrypt.hash(User.password, 10, async function(err, hash) {
      User.password=hash
console.log(User)
      let result = await userService.insertUser(User);
      if(result.affectedRows===1){
          res.json({message:"插入成功"});
      }else{
          res.json({message:"插入失败"})
      }
  });
   
  } catch (e) {
    res.send(e);
  }
})
//指定id，更新用户信息
router.put('/update/:userId', async (req, res, next) => {
  try {
    const userId=req.params.userId;
    const user=req.body;
    console.log(userId);
    console.log(user)
    let result = await userService.updateUser(userId,user);
    if(result.affectedRows===1){
        res.json({message:"更新成功"});
    }else{
        res.json({message:"更新失败"});
    }
  } catch (e) {
    res.send(e);
  }
})
//指定id，删除用户信息
router.delete('/delete/:userId', async (req, res, next) => {
  try {
      const userId=req.params.userId;
      let result = await userService.deleteUser(userId);
      if(result.affectedRows===1){
        res.json({message:"删除成功"});
     }else{
        res.json({message:"删除失败"});
     }
  } catch (e) {
    res.send(e);
  }
})
module.exports = router;