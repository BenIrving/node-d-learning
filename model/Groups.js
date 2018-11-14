module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define(
    "groups",
    {
      groupId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      groupName: {
        type: DataTypes.STRING(255)
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  Groups.associate = models => {
    models.Groups.belongsTo(models.School, { foreignKey: "schoolId" });
  };
  return Groups;
};
