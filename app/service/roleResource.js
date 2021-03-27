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
		const { app } = this
		const conn = await app.mysql.beginTransaction()
		try {
			await app.mysql.query("DELETE FROM role_resource WHERE role_id=?", [role_id])
			// 循环设置新的权限
			for (let i = 0; i < resource_ids.length; i++) {
				await app.mysql.insert("role_resource", {
					role_id,
					resource_id: resource_ids[i]
				})
			}
			await conn.commit()
			return true
		} catch (error) {
			await conn.rollBack()
			return error
		}
	}
}
module.exports = RoleResourceService