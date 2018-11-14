const models = require("../model");

const findByProperty = (property = {}, { include } = {}) =>
  models.User.findOne({ where: property, include });

const findAll = (property = {}, { include } = {}) =>
  User.findAll({ where: property, include });

const findOne = obj => {
  return new Promise((resolve, reject) => {
    models.Profile.findOne(obj)
      .populate("user", ["name", "avatar"])
      .then(profile => resolve(profile))
      .catch(err => reject(err));
  });
};

const find = () => {
  return models.Profile.find().populate("user", ["name", "avatar"]);
};

module.exports = {
  findOne,
  findByProperty,
  findAll
};
