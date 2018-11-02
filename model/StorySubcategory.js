const sequelize = require("../db/db");
const Sequelize = require("Sequelize");

const StorySubcategory = sequelize.define(
  "story_subcategory",
  {
    subcategoryId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    subcategoryName: {
      type: Sequelize.STRING(255)
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = StorySubcategory;
