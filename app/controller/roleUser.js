const BaseController = require("./base.js")
class RoleUserController extends BaseController {
	constructor(...args) {
		super(...args);

		this.entity = "roleUser"
	}
	
}
module.exports = RoleUserController