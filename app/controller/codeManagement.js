"use strict";
const Controller = require("egg").Controller;
const moment = require("moment");

class codeManagementController extends Controller {
  async index() {
    const { ctx, app } = this;
    const {
      pageSize,
      pageNum,
      name,
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
    let sql = " SELECT account,code,state,Id,name,createTime from user ";
    let countSql = " SELECT COUNT (*) as allDataNum FROM user ";
    sql += " where 1=1 ";
    countSql += " where 1=1 ";

    if (value1) {
      // let date1 = value1[0].slice(0, 10);
      // let date2 = value1[1].slice(0, 10);
      sql += " and createTime between :date1 and :date2 ";
      params.date1 = value1[0] + "%";
      params.date2 = value1[1] + "%";

      countSql += " and createTime between :date1 and :date2 ";
      countParams.date1 = value1[0] + "%";
      countParams.date2 = value1[1] + "%";
    }
    if (name) {
      sql += " and name like :name ";
      params.name = "%" + name + "%";

      countSql += " and name like :name ";
      countParams.name = "%" + name + "%";
    }
    if (account) {
      sql += " and account like :account ";
      params.account = "%" + account + "%";

      countSql += " and account like :account ";
      countParams.account = "%" + account + "%";
    }
    sql += " order by createTime asc "; //asc正序，desc倒序

    if (pageSize) {
      sql += " limit :pageNum,:pageSize ";
      params.pageSize = pageSize;
      params.pageNum = upageNum * pageSize;
    }
    const result = await app.mysql.query(sql, params);
    const count = await app.mysql.query(countSql, countParams); // 数据总数
    if (result) {
      result.forEach(item => {
        let createTime = item.createTime.slice(0, 10);
        item.createTime = createTime;
        switch (item.code) {
          case 1:
            item.code = "普通游客";
            break;
          case 10:
            item.code = "普通管理员";
            break;
          case 99:
            item.code = "哥哥";
            break;
        }
      });
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
  async changeUserCode() {
    const { ctx, app } = this;
    const { codeId, userId } = ctx.request.body;
    const row = {
      code: codeId
    };
    const options = {
      where: {
        Id: userId
      }
    };
    const result = await this.app.mysql.update("user", row, options);
    if (result) {
      ctx.body = {
        code: 1,
        msg: "亲！修改成功哦！"
      };
    } else {
      ctx.body = {
        code: -1,
        msg: "修改失败！"
      };
    }
  }
  async deleteUser() {
    const { ctx, app } = this;
    const {
      pageSize,
      pageNum,
      name,
      account,
      UserId,
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
    let sql = " SELECT account,code,state,Id,name,createTime from user ";
    let countSql = " SELECT COUNT (*) as allDataNum FROM user ";
    sql += " where 1=1 ";
    countSql += " where 1=1 ";

    if (value1) {
      // let date1 = value1[0].slice(0, 10);
      // let date2 = value1[1].slice(0, 10);
      sql += " and createTime between :date1 and :date2 ";
      params.date1 = value1[0] + "%";
      params.date2 = value1[1] + "%";

      countSql += " and createTime between :date1 and :date2 ";
      countParams.date1 = value1[0] + "%";
      countParams.date2 = value1[1] + "%";
    }
    if (name) {
      sql += " and name like :name ";
      params.name = "%" + name + "%";

      countSql += " and name like :name ";
      countParams.name = "%" + name + "%";
    }
    if (account) {
      sql += " and account like :account ";
      params.account = "%" + account + "%";

      countSql += " and account like :account ";
      countParams.account = "%" + account + "%";
    }

    const result = await this.app.mysql.delete("user", {
      Id: UserId
    });
    const resultM = await this.app.mysql.delete("message_board", {
      id: UserId
    });
    sql += " order by createTime asc ";

    if (pageSize) {
      sql += " limit :pageNum,:pageSize ";
      params.pageSize = pageSize;
      params.pageNum = upageNum * pageSize;
    }

    const deleteResult = await app.mysql.query(sql, params); //返回删除之后当前的tableData
    const count = await app.mysql.query(countSql, countParams); // 数据总数

    if (deleteResult) {
      deleteResult.forEach(item => {
        let createTime = item.createTime.slice(0, 10);
        item.createTime = createTime;
        switch (item.code) {
          case 1:
            item.code = "普通游客";
            break;
          case 10:
            item.code = "普通管理员";
            break;
          case 99:
            item.code = "哥哥";
            break;
        }
      });
    }

    if (deleteResult) {
      ctx.body = {
        code: 1,
        msg: "删除该用户成功！",
        count,
        deleteResult
      };
    } else {
      ctx.body = {
        code: -1,
        msg: "删除失败！"
      };
    }
  }
}

module.exports = codeManagementController;
