const Story = require("../model/Story");
const User = require("../model/User");
const StoryStatus = require("../model/StoryStatus");
const UpdateRecord = require("../model/UpdateRecord");
const sequelize = require("../db/db");

const findByProperty = (property, { include }) =>
  Story.findOne({ where: property, include });

const findAll = (property, { include } = {}) =>
  Story.findAll({ where: property, include });

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

const findLoggedInUserStories = user =>
  sequelize.query(storyByUserQuery, {
    replacements: [user.userId],
    type: sequelize.QueryTypes.SELECT
  });

const validateGroup = (userId, storyId) =>
  sequelize.query(userExistInGroupQuery, {
    replacements: [userId, storyId],
    type: sequelize.QueryTypes.SELECT
  });

module.exports = {
  findByProperty,
  findByStoryStatusAndUserIds,
  findAll,
  findLoggedInUserStories,
  validateGroup
};

const userExistInGroupQuery =
  "select count(*) as exist from user_groups where userId = ? AND groupId = ( " +
  "Select groupId from user_groups ug " +
  "JOIN story s " +
  "ON s.userId = ug.userId " +
  "where storyId = ?);";

const storyByUserQuery =
  "select s.storyId,s.detail,s.thumbnail as storyImage" +
  ",st.typeName as storyType" +
  ", ss.statusName as status" +
  ", GROUP_CONCAT(g.genreName SEPARATOR ',') as genres" +
  ",ssub.subcategoryName as storySubcategory" +
  ",ur.createdDate as date" +
  ",concat(u.firstName,' ',u.lastName) as userName" +
  " from `story` s" +
  " JOIN `story_status` ss" +
  " ON ss.storyStatusId = s.statusId" +
  " LEFT JOIN `story_genre` sg" +
  " ON s.storyId = sg.storyId" +
  " LEFT JOIN `genre` g" +
  " ON g.genreId = sg.genreId" +
  " JOIN `user` u" +
  " ON u.userId = s.userId" +
  " LEFT JOIN `update_record` ur" +
  " ON s.updateRecordId=ur.updateRecordId" +
  " LEFT JOIN `story_type` st" +
  " ON s.typeId= st.typeId" +
  " JOIN `story_subcategory` ssub" +
  " ON s.subcategoryId = ssub.subcategoryId" +
  " where u.userId =  ? group by (s.storyId)";
