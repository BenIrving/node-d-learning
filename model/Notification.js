const sequelize = require("../db/db");
const Sequelize = require("Sequelize");
const User = require("./User");
const UpdateRecord = require("./UpdateRecord");
const Story = require("./Story");
const Notification = sequelize.define(
  "notification",
  {
    notificationId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    isRead: {
      type: Sequelize.INTEGER
    },
    clickable: {
      type: Sequelize.BOOLEAN
    },
    location: {
      type: Sequelize.STRING(20)
    },
    description: {
      type: Sequelize.STRING(500)
    },
    emoji: {
      type: Sequelize.STRING(20)
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);
Notification.belongsTo(User, { foreignKey: "userId" });
Notification.belongsTo(UpdateRecord, { foreignKey: "updateRecordId" });
Notification.belongsTo(Story, { foreignKey: "storyId" });

module.exports = Notification;
