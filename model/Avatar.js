module.exports = (sequelize, DataTypes) => {
  const Avatar = sequelize.define(
    "avatar",
    {
      avatarId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      topType: {
        type: DataTypes.STRING(255)
      },
      accessoriesType: {
        type: DataTypes.STRING(255)
      },
      hairColor: {
        type: DataTypes.STRING(255)
      },
      facialHairType: {
        type: DataTypes.STRING(255)
      },
      facialHairColor: {
        type: DataTypes.STRING(255)
      },
      clotheType: {
        type: DataTypes.STRING(255)
      },
      eyeType: {
        type: DataTypes.STRING(255)
      },
      eyebrowType: {
        type: DataTypes.STRING(255)
      },
      mouthType: {
        type: DataTypes.STRING(255)
      },
      skinColor: {
        type: DataTypes.STRING(255)
      },
      clotheColor: {
        type: DataTypes.STRING(255)
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  Avatar.associate = models => {
    models.Avatar.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Avatar;
};
