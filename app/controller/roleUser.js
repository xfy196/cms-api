const BaseController = require("./base.js")
class RoleUserController extends BaseController {
	constructor(...args) {
		super(...args);

		this.entity = "roleUser"
	}
	
	async setUserRole(){
		const {ctx, service} = this
		const body = ctx.request.body
		let result = await service.roleUser.setRoleUser(body)
		this.success(200, {}, result ? "保存成功": "保存失败")
	}
}
module.exports = RoleUserController