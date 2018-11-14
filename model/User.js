module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING(255)
      },
      firstName: {
        type: DataTypes.STRING(255)
      },
      lastName: {
        type: DataTypes.STRING(255)
      },
      passwordHash: {
        type: DataTypes.STRING(255)
      },
      registerDate: {
        type: DataTypes.DATE
      },
      userName: {
        type: DataTypes.STRING(255)
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  User.associate = models => {
    models.User.hasOne(models.Avatar, { foreignKey: "userId" });
    models.User.belongsToMany(models.Role, {
      through: "user_role",
      foreignKey: "userId"
    });
    models.User.belongsToMany(models.Groups, {
      through: "user_groups",
      foreignKey: "userId"
    });
    models.User.hasOne(models.Avatar, { foreignKey: "userId" });
  };
  return User;
};
