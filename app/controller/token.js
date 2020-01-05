"use strict";
const Controller = require("egg").Controller;
const moment = require("moment");

class TokenController extends Controller {
  // ctx.state.oauth.token，什么时候调用这里的函数
  async index() {
    const { ctx } = this;
    // 获得token:里面其实包含user，token,client的信息
    const token = ctx.state.oauth.token;
    // const result = await ctx.service.login.login(data);
    ctx.body = token;
  }
}
module.exports = TokenController;
