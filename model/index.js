const fs = require("fs");
var path = require("path");
var basename = path.basename(__filename);
const keys = require("../config/keys");
const Sequelize = require("sequelize");
const camelCase = require("camelcase");

const db = {};
const sequelize = new Sequelize(keys.dbname, keys.dbusername, keys.dbpassword, {
  host: keys.host,
  dialect: keys.dialect,
  operatorsAliases: false,
  define: {
    timestamps: false,
    freezeTableName: true
  },
  // logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    const modelName = camelCase(model.name, { pascalCase: true }); //pascalCase modelName
    db[modelName] = model;
  });
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
