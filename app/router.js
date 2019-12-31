"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // const onlineState = app.middleware.onlineState(); //验证页面是否登录
  router.post("/login", controller.home.login);
  router.post("/forgetpsw", controller.home.forgetpsw);
  router.post("/register", controller.home.register);
  router.post("/changepsw", controller.home.changepsw);
};
