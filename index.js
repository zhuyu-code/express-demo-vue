const express = require("express");
const passport = require("passport");
const app = express();
const port = process.env.PORT || 5000;
const user = require("./router/user");
const users = require("./router/users");
const profile = require("./router/profile");
const article = require("./router/article");
const excel = require("./router/excel");
require("./config/passport")(passport);
console.log("nice2");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/user", user);
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/article", article);
app.use("/api/excel", excel);
app.use(passport.initialize());
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
