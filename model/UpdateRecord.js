const sequelize = require("../db/db");
const Sequelize = require("Sequelize");
const User = require("./User");

const UpdateRecord = sequelize.define(
  "update_record",
  {
    updateRecordId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    createdDate: {
      type: Sequelize.DATE
    },
    updatedDate: {
      type: Sequelize.DATE
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

UpdateRecord.belongsTo(User, { foreignKey: "createdBy" });
UpdateRecord.belongsTo(User, { foreignKey: "updatedBy" });

module.exports = UpdateRecord;
