module.exports = (sequelize, DataTypes) => {
  const UpdateRecord = sequelize.define(
    "update_record",
    {
      updateRecordId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      createdDate: {
        type: DataTypes.DATE
      },
      updatedDate: {
        type: DataTypes.DATE
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  UpdateRecord.associate = models => {
    models.UpdateRecord.belongsTo(models.User, { foreignKey: "createdBy" });
    models.UpdateRecord.belongsTo(models.User, { foreignKey: "updatedBy" });
  };
  return UpdateRecord;
};
