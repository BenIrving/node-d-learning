module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define(
    "genre",
    {
      genreId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      genreName: {
        type: DataTypes.STRING(255)
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }
  );
  Genre.associate = models => {
    models.Genre.belongsToMany(models.Story, {
      through: "story_genre",
      foreignKey: "genreId"
    });
  };
  return Genre;
};
