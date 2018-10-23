const AvatarRepo = require("../repository/AvatarRepo");

const findByProperty = property => AvatarRepo.findByProperty(property);

module.exports = {
  findByProperty
};
