"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async login() {
    const { ctx } = this;
    let params = {};
    const { account, password } = ctx.request.body;
    console.log("account-->", account);
    console.log("password-->", password);

    const user = await ctx.app.mysql.query("select * from user");

    ctx.body = {
      code: 1
    };
  }
}

module.exports = HomeController;
