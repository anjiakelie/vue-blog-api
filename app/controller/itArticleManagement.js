"use strict";
const Controller = require("egg").Controller;
const moment = require("moment");

class itArticleManagementController extends Controller {
  async index() {
    const { ctx, app } = this;
    const { pageSize, pageNum, value1, account, itType } = ctx.request.body;
    let upageNum;
    if (pageNum > 0) {
      upageNum = pageNum - 1;
    } else {
      upageNum = 0;
    }
    let params = {};
    let countParams = {};
    let sql =
      " SELECT a.itDesc,a.createTime,a.itTitle,a.itInt,a.itType,a.itArticleId,b.name,b.account ";
    sql += " FROM it a LEFT JOIN user b ON a.userId = b.Id ";

    let countSql = " SELECT COUNT (*) as allDataNum ";
    countSql += " FROM it a LEFT JOIN user b ON a.userId = b.Id ";

    sql += " where 1=1 ";
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
    if (itType) {
      sql += " and a.itType like :itType ";
      params.itType = "%" + itType + "%";

      countSql += " and a.itType like :itType ";
      countParams.itType = "%" + itType + "%";
    }
    if (account) {
      sql += " and b.account like :account ";
      params.account = "%" + account + "%";

      countSql += " and b.account like :account ";
      countParams.account = "%" + account + "%";
    }
    sql += " order by a.createTime desc "; //asc正序，desc倒序

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
  async addItArticle() {
    const { ctx, app } = this;
    const {
      itDesc,
      itTitle,
      itInt,
      itType,
      userId,
      pageSize,
      pageNum,
      account,
      value1,
      inItType
    } = ctx.request.body;
    const itArticleId =
      moment().format("YYYYMMDDHHmmss") + ctx.helper.rndNum(18); //这是字符串的拼接
    const result = await app.mysql.insert("it", {
      itArticleId,
      userId,
      itDesc,
      itTitle,
      itInt,
      itType: inItType,
      createTime: moment().format("YYYY-MM-DD HH:mm:ss")
    });

    let upageNum;
    if (pageNum > 0) {
      upageNum = pageNum - 1;
    } else {
      upageNum = 0;
    }
    let params = {};
    let countParams = {};
    let sql =
      " SELECT a.itDesc,a.createTime,a.itTitle,a.itInt,a.itType,a.itArticleId,b.name,b.account ";
    sql += " FROM it a LEFT JOIN user b ON a.userId = b.Id ";

    let countSql = " SELECT COUNT (*) as allDataNum ";
    countSql += " FROM it a LEFT JOIN user b ON a.userId = b.Id ";

    sql += " where 1=1 ";
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
    if (itType) {
      sql += " and a.itType like :itType ";
      params.itType = "%" + itType + "%";

      countSql += " and a.itType like :itType ";
      countParams.itType = "%" + itType + "%";
    }
    if (account) {
      sql += " and b.account like :account ";
      params.account = "%" + account + "%";

      countSql += " and b.account like :account ";
      countParams.account = "%" + account + "%";
    }
    sql += " order by a.createTime desc "; //asc正序，desc倒序

    if (pageSize) {
      sql += " limit :pageNum,:pageSize ";
      params.pageSize = pageSize;
      params.pageNum = upageNum * pageSize;
    }
    const resultData = await app.mysql.query(sql, params);
    const count = await app.mysql.query(countSql, countParams); // 数据总数

    if (result) {
      ctx.body = {
        code: 1,
        resultData,
        count
      };
    } else {
      ctx.body = {
        code: -1,
        msg: "亲！出错了哦"
      };
    }

    // if (result.affectedRows === 1) {
    //   ctx.body = {
    //     code: 1,
    //     msg: "新增文章成功!"
    //   };
    //   return;
    // }
  }
  async deleteItArticle() {
    const { ctx, app } = this;
    const {
      pageSize,
      pageNum,
      account,
      value1,
      itType,
      itArticleId
    } = ctx.request.body;
    let upageNum;
    if (pageNum > 0) {
      upageNum = pageNum - 1;
    } else {
      upageNum = 0;
    }
    let params = {};
    let countParams = {};
    let sql =
      " SELECT a.itDesc,a.itDesc,a.createTime,a.itTitle,a.itInt,a.itType,a.itArticleId,b.name,b.account ";
    sql += " FROM it a LEFT JOIN user b ON a.userId = b.Id ";

    let countSql = " SELECT COUNT (*) as allDataNum ";
    countSql += " FROM it a LEFT JOIN user b ON a.userId = b.Id ";

    sql += " where 1=1 ";
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

    if (account) {
      sql += " and a.account like :account ";
      params.account = "%" + account + "%";

      countSql += " and a.account like :account ";
      countParams.account = "%" + account + "%";
    }
    sql += " order by a.createTime desc ";

    if (pageSize) {
      sql += " limit :pageNum,:pageSize ";
      params.pageSize = pageSize;
      params.pageNum = upageNum * pageSize;
    }
    const result = await app.mysql.delete("it", {
      itArticleId: itArticleId
    });
    const deleteResult = await app.mysql.query(sql, params);
    const count = await this.app.mysql.query(countSql); // 数据总数
    if (result) {
      ctx.body = {
        code: 1,
        count,
        deleteResult,
        msg: "文章删除成功!"
      };
    } else {
      ctx.body = {
        code: -1,
        msg: "文章删除失败!"
      };
    }
  }
}
module.exports = itArticleManagementController;
