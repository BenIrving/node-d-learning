const storyRepo = require("../repository/StoryRepo");
const userService = require("../service/userService");
const storyStatusConst = require("../util/const/story_status");
const Group = require("../model/Group");

const findByProperty = (property, options) =>
  storyRepo.findByProperty(property, options);

const getClassmatesPublishedStories = async user => {
  try {
    const groups = await user.getGroups();
    const groupIdList = groups.map(group => group.groupId);
    const users = await userService.findAll(
      {},
      {
        include: [
          {
            model: Group,
            where: { groupId: groupIdList },
            require: true
          }
        ]
      }
    );
    const allUserIds = users.map(user => user.userId);
    const classMateIds = allUserIds.filter(id => id != user.userId); //Take out loggedin user id
    const attributes = ["storyId"];
    const stories = await storyRepo.findByStoryStatusAndUserIds(
      attributes,
      storyStatusConst.PUBLISHED,
      classMateIds
    );
    return stories;
  } catch (error) {
    return error;
  }
};

module.exports = {
  findByProperty,
  getClassmatesPublishedStories
};
