const BaseService = require("./base")
class ResourceService extends BaseService {
    constructor(...args) {
        super(...args)
        this.entity_table = "cms_resource"
    }
    async getResource() {
        const { app } = this;
        const result = await app.mysql.select("cms_resource")
        return result
    }
}
module.exports = ResourceService