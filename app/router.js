'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
	const {
		router,
		controller
	} = app;
	router.resources("user", "/api/user", controller.user)
	router.resources("role", "/api/role", controller.role)
	router.resources("roleUser", "/api/roleUser", controller.roleUser)
	router.resources("roleResource", "/api/roleResource", controller.roleResource)
	router.resources("resource", "/api/resource", controller.resource)
	router.get("/api/getResource", controller.resource.getResource)
	router.post("/api/setRoleResource", controller.roleResource.setRoleResource)
	router.post("/api/setUserRole", controller.roleUser.setUserRole)
};