const BaseController = require("./base")
class ResourceController extends BaseController{
    constructor(...args){
        super(...args)
        this.entity = "resource"
    }

    /**
	 * 获取资源
	 */
	async getResource(){
		const {app, ctx, service}  = this
		let userId = ctx.query.id
		let result = await service.resource.getResource(userId)
		this.success(200, result, "查询成功")
	}
}
module.exports = ResourceController