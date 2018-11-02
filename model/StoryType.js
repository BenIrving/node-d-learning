const sequelize = require("../db/db");
const Sequelize = require("Sequelize");

const StoryType = sequelize.define(
  "story_type",
  {
    typeId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    typeName: {
      type: Sequelize.STRING(255)
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = StoryType;
