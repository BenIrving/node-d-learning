module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "comment",
    {
      commentId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      emoji: {
        type: DataTypes.STRING(255)
      },
      comment: {
        type: DataTypes.STRING(255)
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  Comment.associate = models => {
    models.Comment.belongsTo(models.UpdateRecord, {
      foreignKey: "updateRecordId"
    });
    models.Comment.belongsTo(models.Story, { foreignKey: "storyId" });
  };
  return Comment;
};
