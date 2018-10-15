const Sequelize = require("Sequelize");
const keys = require("../config/keys");

const sequelize = new Sequelize(keys.dbname, keys.dbusername, keys.dbpassword, {
  host: keys.host,
  dialect: keys.dialect,
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
