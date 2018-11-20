const db = require("../model");

const findByProperty = (property = {}, { include } = {}) =>
  db.User.findOne({ where: property, include });

const findAll = (property = {}, { include } = {}) =>
  db.User.findAll({ where: property, include });

const findOne = obj => {
  return new Promise((resolve, reject) => {
    db.Profile.findOne(obj)
      .populate("user", ["name", "avatar"])
      .then(profile => resolve(profile))
      .catch(err => reject(err));
  });
};

const find = () => {
  return db.Profile.find().populate("user", ["name", "avatar"]);
};

const callFiveSecQuery = () =>
  db.sequelize.query("SELECT SLEEP(5)", {
    type: db.sequelize.QueryTypes.SELECT
  });

module.exports = {
  findOne,
  findByProperty,
  findAll,
  callFiveSecQuery
};
