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
};