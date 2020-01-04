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
  router.all("/user/token", oAuth2Server.token(), controller.oauth.token); //前端调用的token接口，all是所有都会发起这个请求
  router.get(
    "/user/authenticate",
    oAuth2Server.authenticate(),
    "user.authenticate"
  );
};
