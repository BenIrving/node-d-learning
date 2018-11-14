const sequelize = require("../db/db");
const Sequelize = require("Sequelize");
module.exports = (sequelize, DataTypes) => {
  const StoryType = sequelize.define(
    "story_type",
    {
      typeId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      typeName: {
        type: DataTypes.STRING(255)
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  return StoryType;
};
