"use strict";
//前后端分离不能使用中间件
module.exports = () => {
  return async function rbac(ctx, next) {
    const { account } = ctx.session;
    console.log("account-->", account);
    if (!account) {
      ctx.logger.debug("[未登录]");
      return await ctx.redirect("/login");
    } else {
      ctx.logger.debug("[已登录]");
      await next();
    }
  };
};
