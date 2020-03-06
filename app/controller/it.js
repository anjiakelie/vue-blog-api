"use strict";
const Controller = require("egg").Controller;
const moment = require("moment");

class itController extends Controller {
  async index() {
    const { ctx, app } = this;
    var itType = ctx.params.id; //返回对象格式
    let params = {};
    let countParams = {};
    let sql = " SELECT itType,itInt,itTitle,itArticleId,createTime from it ";
    let countSql = " SELECT COUNT (*) as allDataNum FROM it ";
    sql += " where 1=1 ";
    countSql += " where 1=1 ";
    if (itType) {
      sql += " and itType like :itType ";
      params.itType = itType;
    }
    sql += " order by createTime desc "; //asc正序，desc倒序
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
}
module.exports = itController;
