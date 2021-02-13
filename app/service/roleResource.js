const BaseService = require("./base.js")

class RoleResourceService extends BaseService {
	constructor(...args) {
		super(...args);

		this.entity_table = "role_resource";
	}
}
module.exports = RoleResourceService