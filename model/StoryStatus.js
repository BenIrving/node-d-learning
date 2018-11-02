const sequelize = require("../db/db");
const Sequelize = require("Sequelize");

const StoryStatus = sequelize.define(
  "story_status",
  {
    storyStatusId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    statusName: {
      type: Sequelize.STRING(255)
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = StoryStatus;
