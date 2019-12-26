"use strict";

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };

exports.mysql = {
  enable: true,
  package: "egg-mysql"
};

exports.cors = {
  enable: true,
  package: "egg-cors"
};

// exports.sessionRedis = {
//   enable: true,
//   package: "egg-session-redis"
// };

// exports.sequelize = {
//   enable: true,
//   package: "egg-sequelize"
// };
