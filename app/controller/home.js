"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async login() {
    const { ctx, app } = this;
    let params = {};
    const { account, password } = ctx.request.body;
    console.log("account-->", account);
    console.log("password-->", password);

    const user = await app.mysql.get("user", {
      account
    });
    console.log("user-->", user);

    ctx.body = {
      code: 12222
    };
  }
}

module.exports = HomeController;
