const Avatar = require("../model/Avatar");

const findByProperty = property => Avatar.findOne({ where: property });

// const findOne = obj => {
//   return new Promise((resolve, reject) => {
//     Profile.findOne(obj)
//       .populate("user", ["name", "avatar"])
//       .then(profile => resolve(profile))
//       .catch(err => reject(err));
//   });
// };

// const find = () => {
//   return Profile.find().populate("user", ["name", "avatar"]);
// };

module.exports = {
  findByProperty
};
