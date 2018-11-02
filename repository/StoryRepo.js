const Story = require("../model/Story");
const User = require("../model/User");
const StoryStatus = require("../model/StoryStatus");
const UpdateRecord = require("../model/UpdateRecord");

const findByProperty = (property, { include }) =>
  User.findOne({ where: property, include });

const findByStoryStatusAndUserIds = (attributes, storyStatus, userIds) => {
  return Story.findAll({
    attributes: attributes,
    include: [
      {
        model: User,
        where: { userId: userIds },
        attributes: [],
        require: true
      },
      {
        model: StoryStatus,
        where: { statusName: storyStatus },
        attributes: [],
        require: true
      },
      {
        model: UpdateRecord
      }
    ]
  });
};
module.exports = {
  findByProperty,
  findByStoryStatusAndUserIds
};
