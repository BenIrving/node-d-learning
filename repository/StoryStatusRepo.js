const models = app.get("models");
const findOne = (property, { include }) =>
  models.User.findOne({ where: property, include });
module.exports = {
  findOne
};
