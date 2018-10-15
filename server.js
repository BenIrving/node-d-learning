const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");

const User = require("./api/users");

const router = express.Router();
const app = express();

//Bdoy parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);
const port = 5000;

// @route     GET /test
// @desc      Tests hello world
// @access    Public
// router.get("/test", (req, res) => {
//   return res.json({ msg: "Hello Worldssssss" });
// });

//router.get("/usama", (req, res) => res.json({ usamaMsg: "I am all in all" }));

app.use("/api/user", User);
app.use(router);

app.listen(port, () => console.log(`Server running on ${port}`));
