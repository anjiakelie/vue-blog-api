"use strict";
const path = require("path");
module.exports = (app) => {
  // Mock Data
  // nocnf.use('file',{
  //  file: path.join(app.config.baseDir,'app/mock/db.json'),
  // });

  class Model {
    constructor(ctx) {
      this.ctx = ctx;
    }

    // 传过来的实参必须格式:client_id,client_secret,接受的形参可以是随意格式的变量
    async getClinet(clientId, clientSecret) {
      const client = app.config.oAuth2Server;
      if (
        clientId !== client.clientId ||
        clientSecret !== client.clientSecret
      ) {
        return;
      }
      return client;
    }

    // 获取用户信息
    async getUser(account, password) {
      const user = await app.mysql.get("user", { account: account });
      if (account !== user.account || password !== user.password) {
        return;
      }
      return { userId: user.Id };
    }

    // access_token的验证
    async getAccessToken() {
      // const token = nconf.get('token');
      // token.accessTokenExpiresAt = new Date(token.accessTokenExpiresAt);
      // token.refreshTokenExpiresAt = new Date(token.refreshTokenExpiresAt);
      // const user = nconf.get('user');
      // const client = nconf.get('client');
      // token.user = user;
      // token.client = client;
      console.log("222");
      return "token";
    }

    // 获得token并保存到数据库 数据库新增token表
    async saveToken(token, client, user) {
      // 把token信息保存到数据库
      //合并对象
      const _token = Object.assign({}, { user }, { client });
      // console.log('_token-->', _token);
      return _token;
    }
  }
  return Model;
};
