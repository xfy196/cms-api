const {
    Service
} = require("egg")

class BaseService extends Service {
    /**
     * 获取所有的实体
     */
    async list() {
        return await this.app.mysql.select(this.entity_table)
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
        return await this.app.mysql.insert(this.entity_table, entity)
    }
    /**
     * 更新用户信息
     * @param {*} user 用户实体参数
     */
    async update(entity) {
        return await this.app.mysql.update(this.entity_table, entity)
    }

    /**
     * 通过用户id删除
     * @param {*} id 唯一id
     */
    async destroy(id) {
        return await this.app.mysql.delete(this.entity_table, {
            id
        })
    }
}
module.exports = BaseService