const sequelize = require("../db/db");
const Sequelize = require("Sequelize");
const Role = require("./Role");
const Avatar = require("./Avatar");

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

Avatar.belongsTo(User, { foreignKey: "userId" });

module.exports = User;
