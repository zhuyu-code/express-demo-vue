const db = require("../config/db");
let articleFindAll = (userId) => {
  console.log("userId", userId);
  console.log(`select * from article where userId=${userId}`);
  return new Promise((resolve, reject) => {
    db.query(`select * from article where userId=${userId}`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

let articleFindOne = (articleId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `select * from article where article_id=${articleId}`,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};

let articleAdd = (article) => {
  return new Promise((resolve, reject) => {
    db.query(
      `insert into article (userId,article_title,article_content) values('${article.userId}','${article.article_title}','${article.article_content}')`,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};
let articleUpdate = (articleId, article) => {
  console.log("articleId", articleId);
  console.log(`select * from article where article_id=${articleId}`);
  return new Promise((resolve, reject) => {
    db.query(
      `update article set article_title='${article.article_title}',article_content='${article.article_content}' where article_id=${articleId}`,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};
let articleDelete = (articleId) => {
  return new Promise((resolve, reject) => {
    db.query(
      `delete from article where article_id=${articleId}`,
      (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      }
    );
  });
};
module.exports = {
  articleFindAll,
  articleAdd,
  articleUpdate,
  articleDelete,
  articleFindOne,
};
