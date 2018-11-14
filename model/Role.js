module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "role",
    {
      roleId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      roleName: {
        type: DataTypes.STRING(255)
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  Role.associate = models => {
    models.Role.belongsToMany(models.User, {
      through: "user_role",
      foreignKey: "roleId"
    });
  };
  return Role;
};
