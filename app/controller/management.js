"use strict";
const Controller = require("egg").Controller;
const moment = require("moment");

class manageMentController extends Controller {
  async index() {
    const { ctx, app } = this;
    let pageNum = 7; //当前页面数据总数
    // const { name, content, account, value1 } = ctx.request.body;
    let params = {};
    let sql = "SELECT a.postId,a.account,a.content,a.createTime,b.name";
    sql += " FROM message_board a LEFT JOIN user b ON a.id = b.Id";
    const result = await app.mysql.query(sql);
    let countSql;
    countSql = " SELECT COUNT (*) as allDataNum FROM message_board ";
    const count = await this.app.mysql.query(countSql); // 数据总数
    if (result) {
      ctx.body = {
        code: 1,
        result,
        count
      };
    } else {
      ctx.body = {
        code: -1,
        msg: "亲！出错了哦"
      };
    }
  }

  async search() {
    const { ctx, app } = this;
    const { name, content, account, value1 } = ctx.request.body;
    let params = {};
    let sql = " SELECT a.postId,a.account,a.content,a.createTime,b.name ";
    sql += " FROM message_board a LEFT JOIN user b ON a.id = b.Id ";
    sql += " where 1=1 ";
    if (value1) {
      // let date1 = value1[0].slice(0, 10);
      // let date2 = value1[1].slice(0, 10);
      sql += " and a.createTime between :date1 and :date2 ";
      params.date1 = value1[0] + "%";
      params.date2 = value1[1] + "%";
    }
    if (name) {
      sql += " and b.name like :name ";
      params.name = "%" + name + "%";
    }
    if (account) {
      sql += " and a.account like :account ";
      console.log("account-->", account);
      params.account = "%" + account + "%";
    }
    if (content) {
      sql += " and a.content like :content ";
      params.content = "%" + content + "%";
    }
    const result = await this.app.mysql.query(sql, params);
    let countSql;
    countSql = " SELECT COUNT (*) as allDataNum FROM message_board ";
    const count = await this.app.mysql.query(countSql); // 数据总数
    if (result) {
      ctx.body = {
        code: 1,
        result,
        count
      };
    } else {
      ctx.body = {
        code: -1,
        msg: "亲！出错了哦"
      };
    }
  }

  async deleteOneManagement() {
    const { ctx, app } = this;
    const { postId } = ctx.request.body;
    console.log("postId-->", postId);
    let sql;
    let params = {};
    if (postId) {
      sql += " and postId like :postId ";
      params.postId = postId;
    }
    const result = await this.app.mysql.delete("message_board", params);
    if (result) {
      ctx.body = {
        code: 1
      };
    } else {
      ctx.body = {
        code: -1
      };
    }
  }
}
module.exports = manageMentController;
