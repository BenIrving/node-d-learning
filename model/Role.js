const sequelize = require("../db/db");
const Sequelize = require("Sequelize");
const User = require("./User");

const Role = sequelize.define(
  "role",
  {
    roleId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    roleName: {
      type: Sequelize.STRING(255)
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

Role.sync({ force: false }).then(() => console.log("Role model synchronized"));
module.exports = Role;
