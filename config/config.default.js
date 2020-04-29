/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
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
    csrf: false,
  };

  exports.cors = {
    //解决跨域问题
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };

  config.mysql = {
    client: {
      host: "localhost", // 数据区获取的地方ip 93.90.74.229 localhost
      port: "3306",
      user: "root",
      password: "111111", //这个密码有点奇葩，连接主机的密码，不是连接数据库的密码  mysqlpwd 111111
      database: "my_blog",
    },
    app: true,
    agent: false,
  };

  config.oAuth2Server = {
    debug: appInfo.env === "local",
    grants: ["password"], // grants:['password','authorization_code','refresh_token']
    clientId: "kyj_client", // 客户端ID
    clientSecret: "111111", // 客户端密码
    accessTokenLifetime: 7200, //自定义访问token的有效，默认一个小时有效期
    refreshTokenLifetime: 86400, //自定义刷新token的有效时间，默认是15天有效期
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
