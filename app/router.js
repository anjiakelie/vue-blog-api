"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, oAuth2Server, middleware } = app;
  const onlineState = middleware.onlineState(); //验证页面是否登录
  // const onlineState = app.middleware.onlineState(); //验证页面是否登录
  router.post("/login", controller.home.login); //登录
  router.post("/forgetpsw", controller.home.forgetpsw); //忘记密码
  router.post("/register", controller.home.register); //注册
  router.post("/changepsw", controller.home.changepsw); //修改密码
  router.get("/loginout", controller.home.loginout); //退出登录
  router.post("/messageboard", controller.messageBoard.index); //留言板提交
  router.post("/managementIndex", controller.management.index); // 后台管理默认的search
  router.post("/managementSearch", controller.management.search); // 后台管理点击的search
  router.post(
    "/deleteOneManagement",
    controller.management.deleteOneManagement
  ); // 后台管理点击最外层删除的search
  // 他会自己调用oauth的依赖的方法
  // router.all("/user/token", oAuth2Server.token(), controller.token.index); //前端调用的token接口，all是所有都会发起这个请求

  // router.get(
  //   // oauth2的验证
  //   "/user/authenticate",
  //   oAuth2Server.authenticate(), //这个TM又是什么方法，啥用？？
  //   controller.home.authenticate
  // );
};
