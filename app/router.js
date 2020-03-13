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
  router.post("/changeusername", controller.home.changeusername); //忘记昵称
  router.get("/loginout", controller.home.loginout); //退出登录
  router.post("/messageboard", controller.messageBoard.index); //留言板提交
  router.post("/managementIndex", controller.messageManagement.index); // 留言板管理后台管理默认的search
  router.post(
    "/deleteOneManagement",
    controller.messageManagement.deleteOneManagement
  ); // 后台管理点击最外层删除的search
  router.post("/codeManagementIndex", controller.codeManagement.index); // 权限管理后台管理默认的search
  router.post(
    "/codeManagementDeleteUser",
    controller.codeManagement.deleteUser
  ); // 删除用户
  router.post(
    "/codeManagementChangeUserCode",
    controller.codeManagement.changeUserCode
  ); // 修改用户权限

  //////////////////// it页面
  router.post(`/it/:id`, controller.it.index); // it页面index
  router.get("/getItNum", controller.it.getItNum); // it页面的文章数量和标签数
  router.get(`/it/article/:itArticleId`, controller.it.articleDetail); // it的详细页面

  /////////////////////// it文章管理
  router.post("/itManagementIndex", controller.itArticleManagement.index); // it文章管理的search
  router.post("/addItArticle", controller.itArticleManagement.addItArticle); // 增加新文章
  router.post(
    "/deleteItArticle",
    controller.itArticleManagement.deleteItArticle
  ); // 删除文章

  // 他会自己调用oauth的依赖的方法
  // router.all("/user/token", oAuth2Server.token(), controller.token.index); //前端调用的token接口，all是所有都会发起这个请求

  // router.get(
  //   // oauth2的验证
  //   "/user/authenticate",
  //   oAuth2Server.authenticate(), //这个TM又是什么方法，啥用？？
  //   controller.home.authenticate
  // );
};
