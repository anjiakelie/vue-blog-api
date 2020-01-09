"use strict";
//前后端分离不能使用中间件
module.exports = () => {
  return async function rbac(ctx, next) {
    const { userInfo } = ctx.session;
    if (!userInfo) {
      ctx.logger.debug("[未登录]");
      ctx.body = {
        code: 2,
        msg: "请您先登录!"
      };
    } else {
      ctx.logger.debug("[已登录]");
      await next();
    }
  };
};
