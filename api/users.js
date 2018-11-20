const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const AvatarService = require("../service/AvatarService");
const models = require("../model");
const userService = require("../service/userService");
const fs = require("fs");
const {
  requireAdmin,
  requireStudent,
  requireTeacher
} = require("../middleware/authurization");

router.get(
  "/async5sec",
  passport.authenticate("jwt", { session: false }),
  //requireAdmin,
  (req, res) => {
    userService.callFiveSecQuery().then(result => {
      return res.json(result);
    });
  }
);

router.get(
  "/sync5sec",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let i = 0;
    while (i < 10000000000) {
      i++;
    }
    res.json({ msg: "loop completed" });
  }
);

// @route     GET /user
// @desc      Returns users list
// @access    Public
router.get(
  "/",
  // passport.authenticate("jwt", { session: false }),
  //requireAdmin,
  (req, res) => {
    //userService.findAll().then(users => {
    //const usersName = users.map(user => user.userName);
    return res.json([
      { userName: "1stUser" },
      { userName: "2ndUser" },
      { userName: "3rdUser" },
      { userName: "4thUser" }
    ]);
    //});
  }
);

//***************************************************************************************************** */
// @route     GET /user
// @desc      Returns users list
// @access    Public
// router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   //requireAdmin,
//   (req, res) => {
//     userService.findAll().then(users => {
//       const usersName = users.map(user => user.userName);
//       return res.json(usersName);
//     });
//   }
// );

// @route     GET /users/avatar
// @desc      Returns User's avatar
// @access    Private
router.get(
  "/avatar",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    models.Avatar.findOne({ where: { userId: req.user.userId } })
      .then(avatar => {
        if (!avatar)
          return res
            .status(404)
            .json({ msg: "Avatar not found against logged in user" });
        res.json(avatar);
      })
      .catch(err => console.log(err));
  }
);

// @route     GET /users/avatar/exists
// @desc      Check's if user has avatar or not
// @access    Private
router.get(
  "/avatar/exists",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const avatarResp = {
      data: { hasAvatar: false },
      success: true,
      count: 0,
      message: null,
      httpStatus: "ok"
    };
    AvatarService.findByProperty({ userId: req.user.userId })
      .then(avatar => {
        if (!avatar) return res.status(404).json(avatarResp);
        avatarResp.data.hasAvatar = true;
        res.json(avatarResp);
      })
      .catch(err => console.log(err));
  }
);

// @route     POST /user/avatar
// @desc      Insert's or update's new avatar for the user
// @access    Private
router.put(
  "/avatar",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const body = req.body;
    const avatarResp = {
      data: null,
      success: null,
      count: null,
      message: "Avatar successfully saved",
      httpStatus: "Ok"
    };
    models.Avatar.findOne({ where: { userId: req.user.userId } })
      .then(avatar => {
        if (!avatar) {
          const newAvatar = new Avatar({ ...body, userId: req.user.userId });
          newAvatar.save().then(newAvatar => res.json(avatarResp));
        } else
          avatar.update({ ...body }).then(savedAvatar => res.json(avatarResp));
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ msg: "There is problem in saving avatar" });
      });
  }
);

// @route     POST/users
// @desc      register's new user
// @access    Public
router.post("/", (req, res) => {
  console.log("inside post request " + req.body.userName);
  models.User.findOne({ where: { userName: req.body.userName } }).then(user => {
    if (user)
      return res.status(404).json({
        userAlreadyExists: "User Already exists" + user
      });
    const newUser = new models.User({
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
  const userName = req.body.username;
  const password = req.body.password;
  models.User.findOne({
    where: { userName },
    include: [
      {
        model: models.Role,
        attributes: ["roleName"]
      }
    ]
  }).then(user => {
    if (!user) return res.status(404).json({ email: "User not found" });
    bcrypt.compare(password, user.passwordHash).then(isMatch => {
      if (isMatch) {
        const payLoad = {
          id: user.userId,
          name: user.userName
        };
        jwt.sign(
          payLoad,
          keys.secretKey,
          { expiresIn: keys.tokenExpiryTime },
          (err, token) => {
            return res.json({
              success: true,
              token: "Bearer " + token,
              firstName: user.firstName,
              lastName: user.lastName,
              roles: user.roles.map(role => role.roleName),
              userId: user.userId,
              displayPic: false
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
