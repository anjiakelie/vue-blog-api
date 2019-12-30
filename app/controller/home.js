"use strict";
const Controller = require("egg").Controller;
const moment = require("moment");

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

  async register() {
    const { ctx, app } = this;
    let params = {};
    const { account, pass, sms, phoneNum } = ctx.request.body;
    const userPassWord = ctx.helper.md5(pass);
    const userId = moment().format("YYYYMMDDHHmmss") + ctx.helper.rndNum(18); //这是字符串的拼接
    console.log("sms-->", sms);
    const hasUser = await app.mysql.get("user", {
      account
    });
    if (hasUser) {
      ctx.body = {
        code: 10,
        msg: "该用户已存在!"
      };
      return;
    }
    if (sms !== "1111") {
      ctx.body = {
        code: -10,
        msg: "验证码错误!"
      };
      return;
    }
    const result = await app.mysql.insert("user", {
      id: userId,
      account,
      password: userPassWord,
      code: 1,
      state: 10,
      phone: phoneNum,
      createTime: moment().format("YYYY-MM-DD HH:mm:ss")
    });

    if (result.affectedRows === 1) {
      ctx.body = {
        code: 1,
        msg: "提交成功"
      };
      return;
    }

    ctx.body = {
      code: -1,
      msg: "提交失败"
    };
  }

  async forgetpsw() {
    const { ctx, app } = this;
    let params = {};
  }
}

module.exports = HomeController;
