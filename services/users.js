const db = require("../config/db");
let userFindOne = (email) => {
  return new Promise((resolve, reject) => {
    db.query(`select * from user where email='${email}'`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
let register = (users) => {
  console.log("test", users);
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO user (userName,password,email,identity) VALUES ('${users.userName}', '${users.password}', '${users.email}','${users.identity}');`,
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
let userFindUserId = (userId) => {
  return new Promise((resolve, reject) => {
    db.query(`select * from user where userId='${userId}'`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
module.exports = {
  register,
  userFindOne,
  userFindUserId,
};
