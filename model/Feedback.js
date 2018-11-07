const sequelize = require("../db/db");
const Sequelize = require("Sequelize");
const UpdateRecord = require("./UpdateRecord");
const Story = require("./Story");

const Feedback = sequelize.define(
  "feedback",
  {
    feedbackId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    feedbackText: {
      type: Sequelize.TEXT
    },
    preparedStatement: {
      type: Sequelize.BOOLEAN
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);
Feedback.belongsTo(UpdateRecord, { foreignKey: "updateRecordId" });

// Story.hasMany(Comment, { foreignKey: "storyId" });
module.exports = Feedback;
