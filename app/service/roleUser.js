const BaseService = require("./base.js")

class RoleUserService extends BaseService {
	constructor(...args) {
		super(...args);

		this.entity_table = "role_user";
	}
}
module.exports = RoleUserService