var mysql = require("mysql");
var pool = mysql.createPool({
  host: "106.75.130.138",
  port: 3310,
  user: "root",
  password: "zhuyumorant",
  database: "money",
}); //数据库连接配置

function query(sql, callback) {
  pool.getConnection(function (err, connection) {
    connection.query(sql, function (err, rows) {
      callback(err, rows);
      connection.release();
    });
  });
} //对数据库进行增删改查操作的基础

exports.query = query;
