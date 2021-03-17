const {
    Controller,
} = require('egg')
class BaseController extends Controller {

    // 查询列表
    async index() {
        const {
            ctx,
            service
        } = this
        const {
            pageNum,
            pageSize,
            ...where
        } = ctx.query
        let list = await service[this.entity].list(isNaN(pageNum) ? 1 : parseInt(pageNum), isNaN(pageSize) ? 3 : parseInt(pageSize), where)

        this.success(200, list, "查询成功")
    }

    /**
     * 获取最新的
     */
    async new() {
        const {
            ctx,
            service
        } = this
        this.success(200, {}, "创建成功")
    }
    /**
     * 创建
     */
    async create() {
        const {
            ctx,
            service
        } = this;
        let entity = ctx.request.body
        await service[this.entity].create(entity)
        this.success(200, {}, "创建成功")
    }

    /**
     * 通过一个id获取数据
     */
    async show() {
        const {
            ctx,
            service
        } = this;
        let {
            id
        } = ctx.params
        let result = await service[this.entity].getUserById(id)
        this.success(200, result ? result : [], "查询成功")
    }

    /**
     * 更新操作
     */
    async update() {
        const {
            ctx,
            service
        } = this;
        let id = ctx.params.id
        let entity = ctx.request.body
        entity.id = id
        let {
            affectedRows
        } = await service[this.entity].update(entity)

        affectedRows === 1 ? this.success(200, {}, "更新成功") : this.error(500, {}, "更新失败")

    }

    /**
     * 删除操作 通过id
     */
    async destroy() {
        const {
            ctx,
            service
        } = this;
        let id = ctx.params.id
        let {
            affectedRows
        } = await service[this.entity].destroy(id)
        affectedRows === 1 ? this.success(200, {}, "删除成功") : this.error(500, {}, "删除失败")
    }

    /**
     * get请求的修改操作
     */
    async edit() {
        const {
            ctx,
            service
        } = this;
        this.success()
    }

    // 成功的方法
    success(status = 200, data = {}, message = "请求成功") {
        this.ctx.body = {
            status,
            data: data,
            message
        }
    }

    error(status = 500, data = {}, message = "网络错误请重试") {
        this.ctx.body = {
            status,
            data: data,
            message
        }
    }
}
module.exports = BaseController