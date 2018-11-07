const User = require("../model/User");

const findByProperty = (property = {}, { include } = {}) =>
  User.findOne({ where: property, include });

const findAll = (property = {}, { include } = {}) =>
  User.findAll({ where: property, include });

const findOne = obj => {
  return new Promise((resolve, reject) => {
    Profile.findOne(obj)
      .populate("user", ["name", "avatar"])
      .then(profile => resolve(profile))
      .catch(err => reject(err));
  });
};

const find = () => {
  return Profile.find().populate("user", ["name", "avatar"]);
};

module.exports = {
  findOne,
  findByProperty,
  findAll
};
