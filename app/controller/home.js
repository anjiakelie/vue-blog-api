"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const user = await ctx.app.mysql.query("select * from user");
    console.log("user-->", user);
    ctx.body = { user };
  }
}

module.exports = HomeController;
