"use strict";
const Controller = require("egg").Controller;

class HomeController extends Controller {
  async login() {
    const { ctx, app } = this;
    let params = {};
    const { account, password } = ctx.request.body;

    const user = await app.mysql.get("user", {
      account
    });

    if (!user) {
      ctx.body = {
        code: "-10",
        msg: "该账号不存在!"
      };
      return;
    }
    if (user.state == "-1") {
      ctx.body = {
        code: "-1",
        msg: "该账号被停用!"
      };
      return;
    }

    const userPassWord = ctx.helper.md5(password);
    if (userPassWord !== user.password) {
      ctx.body = {
        code: "-2",
        msg: "密码不正确!"
      };
      return;
    }

    ctx.body = {
      code: 1
    };
  }
}

module.exports = HomeController;
