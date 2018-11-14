module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define(
    "story",
    {
      storyId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      detail: {
        type: DataTypes.TEXT
      },
      storyImage: {
        type: DataTypes.TEXT
      },
      thumbnail: {
        type: DataTypes.TEXT
      },
      title: {
        type: DataTypes.TEXT
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );

  Story.associate = models => {
    models.Story.belongsTo(models.User, { foreignKey: "userId" });
    models.Story.belongsTo(models.StoryStatus, { foreignKey: "statusId" });
    models.Story.belongsTo(models.StoryType, { foreignKey: "typeId" });
    models.Story.belongsTo(models.Topic, { foreignKey: "topicId" });
    models.Story.belongsTo(models.StorySubcategory, {
      foreignKey: "subcategoryId"
    });
    models.Story.belongsTo(models.UpdateRecord, {
      foreignKey: "updateRecordId"
    });
    models.Story.hasMany(models.Comment, { foreignKey: "storyId" });
    models.Story.belongsToMany(models.Genre, {
      through: "story_genre",
      foreignKey: "storyId"
    });
    models.Story.hasMany(models.Feedback, { foreignKey: "storyId" });
    models.Comment.hasMany(models.Comment, { foreignKey: "storyId" });
  };
  return Story;
};
