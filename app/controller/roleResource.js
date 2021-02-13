const BaseController = require("./base.js")
class RoleResourceController extends BaseController {
	constructor(...args) {
		super(...args);

		this.entity = "roleResource"
	}
}
module.exports = RoleResourceController