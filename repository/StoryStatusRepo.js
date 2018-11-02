const findOne = (property, { include }) =>
  User.findOne({ where: property, include });
module.exports = {
  findOne
};
