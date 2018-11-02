const sequelize = require("../db/db");
const Sequelize = require("Sequelize");
const School = require("./School");

const Group = sequelize.define(
  "groups",
  {
    groupId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    groupName: {
      type: Sequelize.STRING(255)
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

Group.belongsTo(School, { foreignKey: "schoolId" });

module.exports = Group;
