module.exports = (sequelize, DataTypes) => {
  const Feedback = sequelize.define(
    "feedback",
    {
      feedbackId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      feedbackText: {
        type: DataTypes.TEXT
      },
      preparedStatement: {
        type: DataTypes.BOOLEAN
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  Feedback.associate = models => {
    models.Feedback.belongsTo(models.UpdateRecord, {
      foreignKey: "updateRecordId"
    });
    models.Feedback.belongsTo(models.Story, { foreignKey: "storyId" });
  };
  return Feedback;
};
