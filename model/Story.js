const sequelize = require("../db/db");
const Sequelize = require("Sequelize");
const User = require("./User");
const StoryStatus = require("./StoryStatus");
const StoryType = require("./StoryType");
const StorySubcategory = require("./StorySubcategory");
const UpdateRecord = require("./UpdateRecord");
const Topic = require("./Topic");
const Comment = require("./Comment");

const Story = sequelize.define(
  "story",
  {
    storyId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    detail: {
      type: Sequelize.TEXT
    },
    storyImage: {
      type: Sequelize.TEXT
    },
    thumbnail: {
      type: Sequelize.TEXT
    },
    title: {
      type: Sequelize.TEXT
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);
Story.belongsTo(User, { foreignKey: "userId" });
Story.belongsTo(StoryStatus, { foreignKey: "statusId" });
Story.belongsTo(StoryType, { foreignKey: "typeId" });
Story.belongsTo(Topic, { foreignKey: "topicId" });
Story.belongsTo(StorySubcategory, { foreignKey: "subcategoryId" });
Story.belongsTo(UpdateRecord, { foreignKey: "updateRecordId" });
Story.hasMany(Comment, { foreignKey: "storyId" });
module.exports = Story;
