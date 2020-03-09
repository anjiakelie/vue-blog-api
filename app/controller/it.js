"use strict";
const Controller = require("egg").Controller;
const moment = require("moment");

class itController extends Controller {
  async index() {
    const { ctx, app } = this;
    var itType = ctx.params.id; //返回对象格式
    let { pageSize, pageNum } = ctx.request.body;
    let upageNum;
    if (pageNum) {
      upageNum = pageNum - 1;
    } else {
      upageNum = 0;
    }
    let params = {};
    let countParams = {};
    let sql =
      " SELECT a.itType,a.itInt,a.itTitle,a.itArticleId,a.createTime,b.name ";
    sql += " FROM it a LEFT JOIN user b ON a.userId = b.Id ";
    let countSql = " SELECT COUNT (*) as allDataNum FROM it ";
    sql += " where 1=1 ";
    countSql += " where 1=1 ";
    if (itType) {
      sql += " and a.itType like :itType ";
      params.itType = itType;

      countSql += " and itType like :itType ";
      countParams.itType = itType;
    }
    sql += " order by createTime desc "; //asc正序，desc倒序
    if (pageSize) {
      sql += " limit :pageNum,:pageSize ";
      params.pageSize = pageSize;
      params.pageNum = upageNum * pageSize;
    }
    const result = await app.mysql.query(sql, params);
    const count = await app.mysql.query(countSql, countParams); // 数据总数
    result.forEach(item => {
      let createTime = item.createTime.slice(0, 10);
      item.createTime = createTime;
    });
    if (result) {
      ctx.body = {
        code: 1,
        count,
        result
      };
    }
  }
  async getItNum() {
    const { ctx, app } = this;
    let countSql = " SELECT COUNT (*) as allDataNum FROM it ";
    let countItType = " SELECT distinct itType FROM it ";
    const count = await app.mysql.query(countSql);
    const itTypeCount = await app.mysql.query(countItType);
    let itTypeCountLength = itTypeCount.length;
    ctx.body = {
      code: 1,
      count,
      itTypeCountLength
    };
  }
}
module.exports = itController;
