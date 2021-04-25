const db = require("../config/db");

//查询所有用户信息
let showUser = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from user", (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

//根据指定Id查询用户信息
let selectUser = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(`select * from user where userId=${userId}`, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

//插入用户信息
let insertUser = (user) => {
  console.log("插入用户信息", user);
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO user (userName,password,email) VALUES ('${user.userName}', '${user.password}', '${user.email}');`,
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
};

//更新用户信息
let updateUser = (userId, user) => {
  return new Promise((resolve, reject) => {
    db.query(
      `update user set userName='${user.userName}',email='${user.email}',password='${user.password}' where userId = '${userId}'`,
      (err, rows) => {
        if (err) {
          reject(err);
        }
        resolve(rows);
      }
    );
  });
};

//删除用户信息
let deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(`delete from user where userId=${userId}`, (err, rows) => {
      if (err) {
        reject(err);
      }
      resolve(rows);
    });
  });
};

module.exports = {
  showUser,
  selectUser,
  updateUser,
  insertUser,
  deleteUser,
};
