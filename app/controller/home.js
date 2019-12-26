"use strict";

const Controller = require("egg").Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = "hi, eg222g";
    // const user = await this.app.mysql.query("select * from user");
    // console.log("user-->", user);
  }
}

module.exports = HomeController;
