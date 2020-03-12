"use strict";
const Controller = require("egg").Controller;
const moment = require("moment");

class manageMentController extends Controller {
  async index() {
    const { ctx, app } = this;
    const {
      pageSize,
      pageNum,
      name,
      content,
      account,
      value1 //时间
    } = ctx.request.body;
    let upageNum;
    if (pageNum) {
      upageNum = pageNum - 1;
    } else {
      upageNum = 0;
    }
    let params = {};
    let countParams = {};
    let sql = " SELECT a.postId,a.account,a.content,a.createTime,b.name ";
    let countSql =
      " SELECT COUNT (*) as allDataNum FROM message_board a LEFT JOIN user b ON a.id = b.Id ";
    sql += " FROM message_board a LEFT JOIN user b ON a.id = b.Id ";
    sql += " where 1=1 "; // 查询条件太多的时候需要
    countSql += " where 1=1 ";
    if (value1) {
      // let date1 = value1[0].slice(0, 10);
      // let date2 = value1[1].slice(0, 10);
      sql += " and a.createTime between :date1 and :date2 ";
      params.date1 = value1[0] + "%";
      params.date2 = value1[1] + "%";

      countSql += " and a.createTime between :date1 and :date2 ";
      countParams.date1 = value1[0] + "%";
      countParams.date2 = value1[1] + "%";
    }
    if (name) {
      sql += " and b.name like :name ";
      params.name = "%" + name + "%";

      countSql += " and b.name like :name ";
      countParams.name = "%" + name + "%";
    }
    if (account) {
      sql += " and a.account like :account ";
      params.account = "%" + account + "%";

      countSql += " and a.account like :account ";
      countParams.account = "%" + account + "%";
    }
    if (content) {
      sql += " and a.content like :content ";
      params.content = "%" + content + "%";

      countSql += " and a.content like :content ";
      countParams.content = "%" + content + "%";
    }
    sql += " order by a.createTime desc ";

    if (pageSize) {
      sql += " limit :pageNum,:pageSize ";
      params.pageSize = pageSize;
      params.pageNum = upageNum * pageSize;
    }
    const result = await app.mysql.query(sql, params);

    const count = await app.mysql.query(countSql, countParams); // 数据总数
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
    const {
      currentPage,
      pageSize,
      name,
      account,
      value1,
      content,
      postId
    } = ctx.request.body;
    let upageNum;
    if (currentPage > 0) {
      upageNum = currentPage - 1;
    } else {
      upageNum = 0;
    }
    let params = {};
    let countParams = {};
    let countSql;
    let sql = " SELECT a.account,a.content,a.createTime,a.postId,b.name ";
    sql += " FROM message_board a LEFT JOIN user b ON a.id = b.Id ";
    sql += " where 1=1 "; // 查询条件太多的时候需要
    countSql += " where 1=1 ";
    countSql = " SELECT COUNT (*) as allDataNum FROM message_board ";

    if (value1) {
      // let date1 = value1[0].slice(0, 10);
      // let date2 = value1[1].slice(0, 10);
      sql += " and a.createTime between :date1 and :date2 ";
      params.date1 = value1[0] + "%";
      params.date2 = value1[1] + "%";

      countSql += " and a.createTime between :date1 and :date2 ";
      countParams.date1 = value1[0] + "%";
      countParams.date2 = value1[1] + "%";
    }
    if (name) {
      sql += " and b.name like :name ";
      params.name = "%" + name + "%";

      countSql += " and b.name like :name ";
      countParams.name = "%" + name + "%";
    }
    if (account) {
      sql += " and a.account like :account ";
      params.account = "%" + account + "%";

      countSql += " and a.account like :account ";
      countParams.account = "%" + account + "%";
    }
    if (content) {
      sql += " and a.content like :content ";
      params.content = "%" + content + "%";

      countSql += " and a.content like :content ";
      countParams.content = "%" + content + "%";
    }
    sql += " order by a.createTime desc ";

    if (pageSize) {
      sql += " limit :pageNum,:pageSize ";
      params.pageSize = pageSize;
      params.pageNum = upageNum * pageSize;
    }
    const result = await app.mysql.delete("message_board", {
      postId: postId
    });
    const deleteResult = await app.mysql.query(sql, params);

    const count = await this.app.mysql.query(countSql); // 数据总数
    if (result || deleteResult) {
      ctx.body = {
        code: 1,
        count,
        deleteResult,
        msg: "留言删除成功!"
      };
    } else {
      ctx.body = {
        code: -1,
        msg: "留言删除失败!"
      };
    }
  }
}
module.exports = manageMentController;
