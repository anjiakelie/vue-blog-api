"use strict";
const Controller = require("egg").Controller;
const moment = require("moment");
const fs = require("mz/fs");

// const path = require("path");
// const awaitWriteStream = require("await-stream-ready").write;
// const sendToWormhole = require("stream-wormhole");

class HomeController extends Controller {
  async authenticate() {
    // 调用这个函数，就返回一个ok有啥用？？
    this.ctx.body = { result: "ok" };
  }
  async login() {
    const { ctx, app } = this;
    let params = {};
    let data = {};
    const { account, password } = ctx.request.body;
    const user = await app.mysql.get("user", {
      account,
    });
    if (!user) {
      ctx.body = {
        code: "-10",
        msg: "该账号不存在!",
      };
      return;
    }
    if (user.state == "-1") {
      ctx.body = {
        code: "-1",
        msg: "该账号被停用!",
      };
      return;
    }
    const userPassWord = ctx.helper.md5(password);
    if (userPassWord !== user.password) {
      ctx.body = {
        code: "-2",
        msg: "密码不正确!",
      };
      return;
    }
    const { Id, name, state, code, imageUrl } = user;
    data.Id = Id;
    data.account = account;
    data.name = name;
    data.state = state;
    data.code = code;
    data.imageUrl = Buffer.from(imageUrl, "base64").toString("utf-8");

    ctx.body = {
      code: 1,
      data: data,
    };
  }

  async register() {
    const { ctx, app } = this;
    let params = {};
    const { account, pass, sms, phoneNum, name } = ctx.request.body;
    const userPassWord = ctx.helper.md5(pass);
    const userId = moment().format("YYYYMMDDHHmmss") + ctx.helper.rndNum(18); //这是字符串的拼接
    const hasUser = await app.mysql.get("user", {
      account,
    });
    if (hasUser) {
      ctx.body = {
        code: 10,
        msg: "该用户已存在!",
      };
      return;
    }
    if (sms !== "1111") {
      ctx.body = {
        code: -10,
        msg: "验证码错误!",
      };
      return;
    }
    const result = await app.mysql.insert("user", {
      id: userId,
      account,
      password: userPassWord,
      code: 1,
      state: 10,
      name,
      phoneNum,
      createTime: moment().format("YYYY-MM-DD HH:mm:ss"),
    });

    if (result.affectedRows === 1) {
      ctx.body = {
        code: 1,
        msg: "提交成功",
      };
      return;
    }

    ctx.body = {
      code: -1,
      msg: "提交失败",
    };
  }

  async forgetpsw() {
    const { ctx, app } = this;
    let params = {};
    const { account, sms, pass, phoneNum } = ctx.request.body;
    const userPassWord = ctx.helper.md5(pass);
    const user = await app.mysql.get("user", {
      account,
    });
    if (!user) {
      ctx.body = {
        code: -1,
        msg: "该账号不存在!",
      };
      return;
    }
    if (user.phonenum !== phoneNum) {
      ctx.body = {
        code: -11,
        msg: "手机号错误!",
      };
      return;
    }
    if (sms !== "1111") {
      ctx.body = {
        code: -10,
        msg: "验证码错误!",
      };
      return;
    }

    const result = await this.app.mysql.update(
      "user",
      { password: userPassWord },
      { where: { account } }
    );
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 1,
        msg: "密码重置成功，请重新登录！",
      };
      return;
    }
  }

  async changepsw() {
    const { ctx, app } = this;

    const { account, newpass, pass } = ctx.request.body;
    const userPassWord = ctx.helper.md5(newpass);
    const oldPassWord = ctx.helper.md5(pass);

    const user = await app.mysql.get("user", { account });
    if (!user) {
      ctx.body = {
        code: -1,
        msg: "该账号不存在!",
      };
      return;
    }
    if (oldPassWord !== user.password) {
      ctx.body = {
        code: -10,
        msg: "原密码输入错误!",
      };
      return;
    }
    if (userPassWord == user.password) {
      ctx.body = {
        code: -2,
        msg: "原密码不能与新密码一致!",
      };
      return;
    }
    const result = await this.app.mysql.update(
      "user",
      { password: userPassWord },
      { where: { account } }
    );
    if (result.affectedRows === 1) {
      ctx.body = {
        code: 1,
        msg: "密码修改成功，请重新登录！",
      };
      return;
    }
  }
  async loginout() {
    const { ctx } = this;
    ctx.session = null;
    ctx.body = {
      code: 1,
    };
  }

  async changeusername() {
    const { ctx, app } = this;
    const { account, userName } = ctx.request.body;



    const result = await app.mysql.update(
      "user",
      { name: userName },
      { where: { account } }
    );

    const user = await app.mysql.get("user", {
      account,
    });
    let data = {};
    const { Id, name, state, code, imageUrl } = user;
    data.Id = Id;
    data.account = account;
    data.name = name;
    data.state = state;
    data.code = code;
    data.imageUrl = Buffer.from(imageUrl, "base64").toString("utf-8");

    ctx.body = {
      code: 1,
      msg: "修改昵称成功！",
      data,
    };
  }

  async addUserImage() {
    const { ctx, app } = this;
    const { userId } = ctx.request.body;
    const file = ctx.request.files[0];
    // const path = `app/public/userImage/${Date.now()}.png`;
    let fileBufferString = fs.readFileSync(file.filepath).toString("base64");
    // let fileBufferString = fs.readFileSync(file[0].url).toString("base64");
    // const dataBuffer = new Buffer(fileBufferString, "base64"); //把base64码转成buffer对象，
    const result = await this.app.mysql.update(
      "user",
      { imageUrl: fileBufferString },
      { where: { id: userId } }
    );
    // 这里的路径写入,通常用在路径返回
    // fs.writeFile(path, dataBuffer, function (err) {
    //   err ? console.log(err) : console.log("写入成功！");
    // });
    ctx.body = {
      code: 0,
      msg: "用户头像上传成功!",
      imageUrl: fileBufferString,
    };
  }
}

module.exports = HomeController;
