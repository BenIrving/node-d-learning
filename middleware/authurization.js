// Api type will check if it's public or private
//accessRole will allow only to
const requireAdmin = ({ user: { roles } }, res, next) => {
  console.log(roles[0].roleName);
  if (roles.filter(role => role.roleName === "ADMIN").length > 0) return next();
  return res
    .status(401)
    .json({ msg: "User not authorized to perform this action" });
};

const requireStudent = ({ user: { roles } }, res, next) => {
  console.log(roles[0].roleName);
  if (roles.filter(role => role.roleName === "STUDENT").length > 0)
    return next();
  return res
    .status(401)
    .json({ msg: "User not authorized to perform this action" });
};

const requireTeacher = ({ user: { roles } }, res, next) => {
  console.log(roles[0].roleName);
  if (roles.filter(role => role.roleName === "TEACHER").length > 0)
    return next();
  return res
    .status(401)
    .json({ msg: "User not authorized to perform this action" });
};
module.exports = {
  requireAdmin,
  requireStudent,
  requireTeacher
};
