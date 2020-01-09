"use strict";
const Controller = require("egg").Controller;
const moment = require("moment");

class messageBoardController extends Controller {
  async index() {
    const { ctx, app } = this;
    const { userId, content, account } = ctx.request.body;
    const result = await app.mysql.insert("message_board", {
      id: userId,
      content,
      account,
      createTime: moment().format("YYYY-MM-DD HH:mm:ss")
    });
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 1,
        msg: "留言提交成功!"
      };
      return;
    }
    ctx.body = {
      code: -1,
      msg: "提交失败!"
    };
  }
}

module.exports = messageBoardController;
