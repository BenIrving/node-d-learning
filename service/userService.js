const userRepo = require("../repository/UserRepo");

const findByProperty = (property, options) =>
  userRepo.findByProperty(property, options);

module.exports = {
  findByProperty
};
