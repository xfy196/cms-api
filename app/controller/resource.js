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
		let result = await service.resource.getResource()
		this.success(200, result, "查询成功")
	}
}
module.exports = ResourceController