const sequelize = require("../db/db");
const Sequelize = require("Sequelize");
module.exports = (sequelize, DataTypes) => {
  const StorySubcategory = sequelize.define(
    "story_subcategory",
    {
      subcategoryId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      subcategoryName: {
        type: DataTypes.STRING(255)
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  return StorySubcategory;
};
