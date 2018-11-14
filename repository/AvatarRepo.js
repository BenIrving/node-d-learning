const models = require("../model");

const findByProperty = property => models.Avatar.findOne({ where: property });

module.exports = {
  findByProperty
};
