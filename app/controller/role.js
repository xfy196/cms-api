const BaseController = require("./base.js")
class RoleController extends BaseController {
	constructor(...args) {
		super(...args);

		this.entity = "role"
	}
	
}

module.exports = RoleController