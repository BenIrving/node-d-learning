const sequelize = require("../db/db");
const Sequelize = require("Sequelize");
const UpdateRecord = require("./UpdateRecord");
const Story = require("./Story");

const Comment = sequelize.define(
  "comment",
  {
    commentId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    emoji: {
      type: Sequelize.STRING(255)
    },
    comment: {
      type: Sequelize.STRING(255)
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);
Comment.belongsTo(UpdateRecord, { foreignKey: "updateRecordId" });

// Story.hasMany(Comment, { foreignKey: "storyId" });
module.exports = Comment;
