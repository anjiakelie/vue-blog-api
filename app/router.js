"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post("/login", controller.home.login);
  router.post("/forgetpsw", controller.home.forgetpsw);
  router.post("/register", controller.home.register);
  router.post("/changepsw", controller.home.changepsw);
};
