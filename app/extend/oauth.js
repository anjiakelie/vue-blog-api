"use strict";
const path = require("path");
// const nconf = require('nconf');//用在mocker的
module.exports = app => {
  // nconf.use('file',{
  //   file:path.join(app.config.baseDir,'app/mock/db.json');
  // })
  // 这些方法是由我们自己定义的，需要重新改，因为这里使用的是mongoDb

  class Model {
    constructor(ctx) {
      this.ctx = ctx;
    }
    async getClient(clientId, clientSecret) {
      // 自己调用的方法，然后ID和密码都是在配置那里自己取的
      // const client = nconf.get('client');
      if (
        clientId !== clientId.clientId ||
        clientSecret !== clientSecret.clientSecret
      ) {
        return;
      }
      return client;
    }
    async getUser(username, password) {
      // const user = nconf.get("user");
      if (username !== user.username || password !== user.password) {
        return;
      }
      return { userId: user.id };
    }
    async getAccessToken(bearerToken) {
      // const token = nconf.get("token");
      token.accessTokenExpiresAt = new Date(token.accessTokenExpiresAt);
      token.refreshTokenExpiresAt = new Date(token.refreshTokenExpiresAt);
      // const user = nconf.get("user");
      // const client = nconf.get("client");
      // token.user = user;
      // token.client = client;
      return token;
    }
    async saveToken(token, client, user) {
      const _token = Object.assign({}, token, { user }, { client });
      // nconf.set("token", _token);
      // nconf.save();
      return _token;
    }
  }
  return Model;
};