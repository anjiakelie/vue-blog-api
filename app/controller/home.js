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
    console.log("userPassWord-->", userPassWord);
    console.log("user.password-->", user.password);
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

  async forgetpsw() {
    const { ctx, app } = this;
    let params = {};
    const { account, pass, sms } = ctx.request.body;
    const userPassWord = ctx.helper.md5(pass);
    const userId = moment().format("YYYYMMDDHHmmss") + ctx.helper.rndNum(18);
    console.log("userId-->", userId);
    const conn = await app.mysql.beginTransaction(); // 初始化事务
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

    try {
      const result = await conn.insert("user", {
        id: userId,
        account,
        password: userPassWord,
        code: 1,
        state: 10,
        createTime: moment().format("YYYY-MM-DD HH:mm:ss")
      });
      await conn.commit(); // 提交事务
      if (result.affectedRows === 1) {
        ctx.body = {
          code: 0,
          msg: "提交成功"
        };
        return;
      }
    } catch (err) {
      await conn.rollback(); // 一定记得捕获异常后回滚事务！！
      ctx.body = {
        code: -1,
        msg: "提交失败"
      };
      ctx.logger.info("error--->", err);
      throw err;
    }
    ctx.body = {
      code: -1,
      msg: "提交失败"
    };
  }
}

module.exports = HomeController;
