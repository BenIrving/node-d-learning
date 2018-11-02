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

Genre.belongsToMany(Story, { through: "story_genre", foreignKey: "genreId" });
Story.belongsToMany(Genre, { through: "story_genre", foreignKey: "storyId" });

module.exports = Genre;
