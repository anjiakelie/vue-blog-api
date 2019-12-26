/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1577088745395_1574";

  // add your middleware config here
  config.middleware = [];
  config.security = {
    //要加上安全的东西
    csrf: false
  };

  exports.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH"
  };

  config.mysql = {
    client: {
      host: "127.0.0.1",
      port: "3306",
      user: "root",
      password: "mysqlpwd", //这个密码有点奇葩，连接主机的密码，不是连接数据库的密码
      database: "my_blog"
    },
    app: true,
    agent: false
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig
  };
};
