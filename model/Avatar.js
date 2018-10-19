const sequelize = require("../db/db");
const Sequelize = require("Sequelize");
const User = require("./User");

const Avatar = sequelize.define(
  "avatar",
  {
    avatarId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    topType: {
      type: Sequelize.STRING(255)
    },
    accessoriesType: {
      type: Sequelize.STRING(255)
    },
    hairColor: {
      type: Sequelize.STRING(255)
    },
    facialHairType: {
      type: Sequelize.STRING(255)
    },
    facialHairColor: {
      type: Sequelize.STRING(255)
    },
    clotheType: {
      type: Sequelize.STRING(255)
    },
    eyeType: {
      type: Sequelize.STRING(255)
    },
    eyebrowType: {
      type: Sequelize.STRING(255)
    },
    mouthType: {
      type: Sequelize.STRING(255)
    },
    skinColor: {
      type: Sequelize.STRING(255)
    },
    clotheColor: {
      type: Sequelize.STRING(255)
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);
module.exports = Avatar;
