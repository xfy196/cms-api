const BaseService = require("./base.js")

class RoleUserService extends BaseService {
	constructor(...args) {
		super(...args);

		this.entity_table = "role_user";
	}

	/**
	 * 设置用户和角色之间的关系
	 */
	async setRoleUser({user_id, role_ids}){
		const {app} = this;
		const conn = await app.mysql.beginTransaction()
		try {
			await app.mysql.query("DELETE FROM role_user WHERE user_id=?", [user_id])
			// 循环设置新的权限
			for (let i = 0; i < role_ids.length; i++) {
				await app.mysql.insert("role_user", {
					user_id,
					role_id: role_ids[i]
				})
			}
			await conn.commit()
			return true
		} catch (error) {
			await conn.rollback()
			return error
		}
	}
}
module.exports = RoleUserService