const BaseService = require("./base.js")

class RoleResourceService extends BaseService {
	constructor(...args) {
		super(...args);

		this.entity_table = "role_resource";
	}

	/**
	 * 
	 * @param {*} param0 
	 * 设置权限
	 */
	async setRoleResource({ role_id, resource_ids }) {
		try {
			const { app } = this
			await app.mysql.query("DELETE FROM role_resource WHERE role_id=?", [role_id])
			// 循环设置新的权限
			for (let i = 0; i < resource_ids.length; i++) {
				let a = await app.mysql.insert("role_resource", {
					role_id,
					resource_id: resource_ids[i]
				})
			}
			return true
		} catch (error) {
			return false
		}
	}
}
module.exports = RoleResourceService