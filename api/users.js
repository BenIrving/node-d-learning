const express = require("express");
const router = express.Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");
// @route     GET /users
// @desc      Returns users list
// @access    Public
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("inside method GetAll users");
    User.findAll().then(users =>
      users.forEach(user => console.log(user.userName))
    );
    res.json({ data: "read from sql, coming soon" });
  }
);

// @route     POST/users
// @desc      register's new user
// @access    Public
router.post("/", (req, res) => {
  console.log("inside post request " + req.body.userName);
  User.findOne({ where: { userName: req.body.userName } }).then(user => {
    if (user)
      return res.status(404).json({
        userAlreadyExists: "User Already exists" + user
      });
    const newUser = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      passwordHash: req.body.password,
      registerDate: Date.now(),
      userName: req.body.userName
    });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.passwordHash, salt, (err, hash) => {
        if (err) throw err;
        newUser.passwordHash = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

// @route     POST/users
// @desc      user Login
// @access    Public
router.post("/login", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  User.findOne({ where: { userName } }).then(user => {
    if (!user) return res.status(404).json({ email: "User not found" });
    //check password
    bcrypt.compare(password, user.passwordHash).then(isMatch => {
      if (isMatch) {
        const payLoad = { id: user.userId, name: user.userName };
        jwt.sign(
          payLoad,
          keys.secretKey,
          { expiresIn: keys.tokenExpiryTime },
          (err, token) => {
            return res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(404).json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
