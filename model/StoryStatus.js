module.exports = (sequelize, DataTypes) => {
  const StoryStatus = sequelize.define(
    "story_status",
    {
      storyStatusId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      statusName: {
        type: DataTypes.STRING(255)
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  return StoryStatus;
};
