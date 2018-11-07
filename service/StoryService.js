const storyRepo = require("../repository/StoryRepo");
const userService = require("../service/userService");
const storyStatusConst = require("../util/const/story_status");
const Group = require("../model/Group");
const Feedback = require("../model/Feedback");

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

const getLoggedInUserStories = async user => {
  return storyRepo.findLoggedInUserStories(user);
  // const stories = await storyRepo.findAll({ userId: user.userId });
  // return stories.map(story => {
  //   const respObj = {
  //     thumbnail: story.storyImage,
  //     storyId: story.storyId,
  //     storyImage: story.storyImage,
  //     title: story.title,
  //     userId: user.userId,
  //     userName: user.firstName + " " + user.lastName,
  //     detail:
  //       story.detail &&
  //       story.detail.substring(0, Math.min(story.detail.length, 129))
  //   };
  //   story.getStory_status().then(storyStatus => {
  //     respObj.status = storyStatus.getStoryStatus;
  //     return respObj;
  //   });
  //   story.getStory_type().then(storyType => {
  //     respObj.storyType = storyType && storyType.typeName;
  //     return respObj;
  //   });
  //   story.getGenres().then(genres => {
  //     const genreNames = genres.map(genre => genre.genreName);
  //     respObj.genres = genreNames;
  //     return respObj;
  //   });
  //   return respObj;
  // });
};

const getClassfellowStoryById = async (user, storyId) => {
  try {
    const count = await validateGroup(user.userId, storyId);
    if (count && count[0].exist != 1)
      return { message: "Unauthorized to read other classfellow story" };
    else {
      const story = await storyRepo.findByProperty(
        { storyId: storyId },
        {
          include: [
            {
              model: Feedback
            }
          ]
        }
      );
      const feedbacks = await story.getFeedbacks();
      const user = await story.getUser();
      const avatar = await user.getAvatar();
    }
  } catch (error) {
    console.log(error);
  }
};

// Validates if user is reading his class fellows story
const validateGroup = (userId, storyId) =>
  storyRepo.validateGroup(userId, storyId).then(count => count);

module.exports = {
  findByProperty,
  getClassmatesPublishedStories,
  getLoggedInUserStories,
  getClassfellowStoryById
};
