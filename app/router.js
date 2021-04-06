'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const {
		router,
		controller
	} = app;
	// 返回中间件的函数
	const  auth = app.middleware.auth(app.config.auth, app)
	router.resources("user", "/api/user", auth, controller.user)
	router.resources("role", "/api/role", auth, controller.role)
	router.resources("roleUser", "/api/roleUser", controller.roleUser)
	router.resources("roleResource", "/api/roleResource", controller.roleResource)
	router.resources("resource", "/api/resource", controller.resource)
	router.get("/api/getResource", controller.resource.getResource)
	router.post("/api/setRoleResource", controller.roleResource.setRoleResource)
	router.post("/api/setUserRole", controller.roleUser.setUserRole)
	router.get("/api/getCaptcha", controller.user.captcha)
	router.post("/api/checkCaptcha", controller.user.checkCaptcha)
	router.post("/api/signIn", controller.user.signIn)
	router.post("/api/signOut", controller.user.signOut)
	router.post("/api/signUp", controller.user.signUp)
	router.post("/api/getUserInfo", controller.user.getUserInfoByToken)
};