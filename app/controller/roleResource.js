const BaseController = require("./base.js")
class RoleResourceController extends BaseController {
	constructor(...args) {
		super(...args);

		this.entity = "roleResource"
	}
	/**
	 * 设置角色和资源
	 */
	async setRoleResource(){
		const {ctx, service} = this;
		const body = ctx.request.body
		let result = await service.roleResource.setRoleResource(body)
		this.success(200, {}, result ? "保存成功": "保存失败")
	}
}
module.exports = RoleResourceController