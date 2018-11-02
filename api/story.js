const express = require("express");
const router = express.Router();
const passport = require("passport");
const storyService = require("../service/StoryService");
const dateFromatter = require("../util/date-util");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const stories = await storyService.getClassmatesPublishedStories(req.user);
    const storiesResp = stories.map(story => ({
      date: dateFromatter(new Date(story.update_record.updatedDate.toString())),
      storyId: story.storyId
    }));
    res.json(storiesResp);
  }
);

module.exports = router;
