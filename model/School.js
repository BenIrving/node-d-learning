const sequelize = require("../db/db");
const Sequelize = require("Sequelize");

const School = sequelize.define(
  "school",
  {
    schoolId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    schoolName: {
      type: Sequelize.STRING(255)
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = School;
