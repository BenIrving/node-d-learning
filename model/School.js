module.exports = (sequelize, DataTypes) => {
  const School = sequelize.define(
    "school",
    {
      schoolId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      schoolName: {
        type: DataTypes.STRING(255)
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  return School;
};
