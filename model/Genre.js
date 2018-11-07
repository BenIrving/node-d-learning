const sequelize = require("../db/db");
const Sequelize = require("Sequelize");
const Story = require("./Story");

const Genre = sequelize.define(
  "genre",
  {
    genreId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    genreName: {
      type: Sequelize.STRING(255)
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = Genre;
