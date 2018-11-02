const sequelize = require("../db/db");
const Sequelize = require("Sequelize");
const Avatar = require("./Avatar");
const Role = require("./Role");
const Group = require("./Group");

const User = sequelize.define(
  "user",
  {
    userId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING(255)
    },
    firstName: {
      type: Sequelize.STRING(255)
    },
    lastName: {
      type: Sequelize.STRING(255)
    },
    passwordHash: {
      type: Sequelize.STRING(255)
    },
    registerDate: {
      type: Sequelize.DATE
    },
    userName: {
      type: Sequelize.STRING(255)
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);
User.belongsToMany(Role, { through: "user_role", foreignKey: "userId" });
Role.belongsToMany(User, { through: "user_role", foreignKey: "roleId" });

User.belongsToMany(Group, { through: "user_groups", foreignKey: "userId" });
Group.belongsToMany(User, { through: "user_groups", foreignKey: "groupId" });

Avatar.belongsTo(User, { foreignKey: "userId" });

module.exports = User;
