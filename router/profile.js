const express = require("express");
const passport = require("passport");
const router = express.Router();
const profileService = require("../services/profile");
//添加资金信息
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const newProfile = {};
    console.log("增加资金参数", req.body);
    if (req.body.type) newProfile.type = req.body.type;
    if (req.body.description) newProfile.description = req.body.description;
    if (req.body.income) newProfile.income = req.body.income;
    if (req.body.expend) newProfile.expend = req.body.expend;
    if (req.body.cash) newProfile.cash = req.body.cash;
    if (req.body.remark) newProfile.remark = req.body.remark;
    console.log(req.body);
    console.log(newProfile);
    const result = await profileService.profileAdd(newProfile);
    if (result.affectedRows == 1) {
      res.status(200).json({ message: "添加成功" });
    }
  }
);
//查询用户所有信息
router.get(
  "/findall",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const result = await profileService.profileFindAll();
    console.log("查询资金信息", result);
    res.json(result);
  }
);
//查询用户指定id信息
router.get("/find/:id", async (req, res, next) => {
  const userId = req.params.id;
  const result = await profileService.profileFindOne(userId);
  res.json(result);
});
//修改指定id信息
router.post("/edit/:id", async (req, res, next) => {
  const userId = req.params.id;
  const newProfile = {};
  if (req.body.type) newProfile.type = req.body.type;
  if (req.body.description) newProfile.description = req.body.description;
  if (req.body.income) newProfile.income = req.body.income;
  if (req.body.expend) newProfile.expend = req.body.expend;
  if (req.body.cash) newProfile.cash = req.body.cash;
  if (req.body.remark) newProfile.remark = req.body.remark;
  const result = await profileService.profileUpdate(userId, newProfile);
  if (result.affectedRows == 1) {
    res.status(200).json({ message: "添加成功" });
  }
});
//删除指定id信息
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const result = await profileService.profileDeleteId(req.params.id);
    if (result.affectedRows === 1) {
      res.status(200).json({ message: "删除成功" });
    } else {
      res.status(404).json({ message: "删除失败" });
    }
  }
);
module.exports = router;
