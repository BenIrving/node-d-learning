const sequelize = require("../db/db");
const Sequelize = require("Sequelize");
const Avatar = require("./Avatar");

const Topic = sequelize.define(
  "topic",
  {
    topicId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    topicDetail: {
      type: Sequelize.TEXT
    },
    topicName: {
      type: Sequelize.STRING(255)
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = Topic;
