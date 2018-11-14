module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define(
    "notification",
    {
      notificationId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      isRead: {
        type: DataTypes.INTEGER
      },
      clickable: {
        type: DataTypes.BOOLEAN
      },
      location: {
        type: DataTypes.STRING(20)
      },
      description: {
        type: DataTypes.STRING(500)
      },
      emoji: {
        type: DataTypes.STRING(20)
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  Notification.associate = models => {
    models.Notification.belongsTo(models.User, { foreignKey: "userId" });
    models.Notification.belongsTo(models.UpdateRecord, {
      foreignKey: "updateRecordId"
    });
    models.Notification.belongsTo(models.Story, { foreignKey: "storyId" });
  };
  return Notification;
};
