const User = require("../model/User");

const findByProperty = (property, options) => User.findOne(property, options);

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
  findByProperty
};
