const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../model/User");
const keys = require("../config/keys");
const Role = require("../model/Role");
const UserService = require("../service/userService");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretKey;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwtPayload, done) => {
      UserService.findByProperty(
        { userId: jwtPayload.id },
        {
          include: [
            {
              model: Role,
              attributes: ["roleName"],
              through: {
                where: { userId: jwtPayload.id }
              }
            }
          ]
        }
      )
        .then(user => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
