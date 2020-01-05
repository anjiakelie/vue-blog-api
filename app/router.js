"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, oAuth2Server, middleware } = app;
  const onlineState = middleware.onlineState(); //验证页面是否登录
  // const onlineState = app.middleware.onlineState(); //验证页面是否登录
  router.post("/login", controller.home.login);
  router.post("/forgetpsw", controller.home.forgetpsw);
  router.post("/register", controller.home.register);
  router.post("/changepsw", onlineState, controller.home.changepsw);
  // 他会自己调用oauth的依赖的方法
  router.all("/user/token", oAuth2Server.token(), controller.token.index); //前端调用的token接口，all是所有都会发起这个请求

  router.get(
    // oauth2的验证
    "/user/authenticate",
    oAuth2Server.authenticate(), //这个TM又是什么方法，啥用？？
    controller.home.authenticate
  );
};
