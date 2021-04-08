const BaseService = require("./base")
class ResourceService extends BaseService {
    constructor(...args) {
        super(...args)
        this.entity_table = "cms_resource"
    }
    /**
     * 
     * @returns 
     * 获取系统菜单树的资源
     */
    async getResource(userId) {
        const { app } = this;
        const resources = await app.mysql.query(`
        SELECT cms_resource.* FROM cms_user INNER JOIN role_user ON cms_user.id = role_user.user_id
INNER JOIN role_resource ON role_user.role_id = role_resource.role_id
INNER JOIN cms_resource ON role_resource.resource_id = cms_resource.id
WHERE cms_user.id = ${userId}`)
        // 把得到的结果进行树级菜单处理
        let map = {}
        let sourceMenus = []
        resources.forEach(resource => {
            resource.children = []
            map[resource.id] = resource
            // 如果你的parent_id为0那么我们认为就把资源放入这一层中
            if(resource.parent_id === 0){
                sourceMenus.push(resource)
            }else {
                map[resource.parent_id].children.push(resource)
            }
        })
        return sourceMenus
    }

}
module.exports = ResourceService