const express = require("express");
const router = express.Router();
const User = require("../model/User");
const keys = require("../config/keys");
const passport = require("passport");
const Notification = require("../model/Notification");
const Story = require("../model/Story");
const Sequelize = require("sequelize");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Notification.findAll({
      where: { userId: req.user.userId },
      include: [
        {
          model: Story,
          attributes: ["title"],
          through: Story.title
        }
      ]
    })
      .then(notifications => {
        const notificationResp = notifications.map(notification => {
          return (notificationObj = {
            ...notification.dataValues,
            storyTitle: notification.dataValues.story.title
          });
        });
        res.json(notificationResp);
      })
      .catch(err => res.json(err));
  }
);

module.exports = router;
