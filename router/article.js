const express = require("express");
const router = express.Router();
const passport = require("passport");
const articleService = require("../services/article");
const formatDate = require("../util/date");
//通过userId查询所有Id信息
router.get(
  "/find/:userId",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const result = await articleService.articleFindAll(req.params.userId);
      console.log(result);
      result.forEach((item) => {
        item.article_start = formatDate.formatDateTime(item.article_start);
        console.log(item.article_start);
      });
      // console.log(result);
      res.status(200).json(result);
    } catch (error) {
      res.send(error);
    }
  }
);

//通过文章id查询文章详细信息
router.get(
  "/findOne/:articleId",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const result = await articleService.articleFindOne(req.params.articleId);
      console.log(result);

      res.status(200).json(result);
    } catch (error) {
      res.send(error);
    }
  }
);
//添加文章信息
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const data = req.body;
      const result = await articleService.articleAdd(data);
      if (result.affectedRows === 1) {
        res.status(200).json({
          code: 200,
          message: "添加成功",
        });
      }
    } catch (error) {
      res.send(error);
    }
  }
);
//编辑文章信息
router.put(
  "/edit/:articleId",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const result = await articleService.articleUpdate(
        req.params.articleId,
        req.body
      );
      console.log("result", result);
      if (result.insertId === 0) {
        res.status(200).json({
          code: 200,
          message: "更新成功",
        });
      }
    } catch (error) {
      res.send(error);
    }
  }
);
router.delete(
  "/delete/:articleId",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    try {
      const result = await articleService.articleDelete(req.params.articleId);
      if (result.insertId === 0) {
        res.json({
          code: 200,
          message: "删除成功",
        });
      }
    } catch (error) {
      res.send(error);
    }
  }
);
module.exports = router;
