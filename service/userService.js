const userRepo = require("../repository/UserRepo");

const findByProperty = (property, options) =>
  userRepo.findByProperty(property, options);

const findAll = (property, options) => userRepo.findAll(property, options);

const callFiveSecQuery = () => userRepo.callFiveSecQuery();
module.exports = {
  findByProperty,
  findAll,
  callFiveSecQuery
};
