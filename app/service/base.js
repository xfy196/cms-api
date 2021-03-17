const {
    Service
} = require("egg")

class BaseService extends Service {
    /**
     * 获取所有的实体
     */
    async list(pageNum, pageSize, where) {
        return await this.app.mysql.select(this.entity_table, {
            where,
            order: [
                ["id", "asc"]
            ],
            offset: (pageNum - 1) * pageSize,
            limit: pageSize
        })
    }
    /**
     * 通过用户id获取的信息
     * @param {*} id id 
     */
    async getUserById(id) {
        return await this.app.mysql.get(this.entity_table, {
            id
        })
    }
    /**
     * 
     * 创建实体
     * @param {*} user 实体参数
     */
    async create(entity) {
        let result = await this.app.mysql.insert(this.entity_table, entity)
        return result
    }
    /**
     * 更新用户信息
     * @param {*} user 用户实体参数
     */
    async update(entity) {
        let result = await this.app.mysql.update(this.entity_table, entity)
        return result
    }

    /**
     * 通过用户id删除
     * @param {*} id 唯一id
     */
    async destroy(id) {
        let result = await this.app.mysql.delete(this.entity_table, {
            id
        })
        return result
    }
}
module.exports = BaseService