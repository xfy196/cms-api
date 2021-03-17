const BaseService = require("./base.js")

class RoleService extends BaseService {
	constructor(...args) {
		super(...args);

		this.entity_table = "cms_role";
	}
	
}
module.exports = RoleService