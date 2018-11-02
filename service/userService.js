const userRepo = require("../repository/UserRepo");

const findByProperty = (property, options) =>
  userRepo.findByProperty(property, options);

const findAll = (property, options) => userRepo.findAll(property, options);
module.exports = {
  findByProperty,
  findAll
};
