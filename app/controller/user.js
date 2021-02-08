const {
    Controller
} = require('egg')
class UserController extends Controller {

    // 查询用户表功能
    async index() {
        const {
            ctx,
            service
        } = this
        let users = await service.user.list()
        ctx.body = users
    }

    /**
     * 获取最新的
     */
    async new() {
        const {
            ctx,
            service
        } = this
        ctx.body = {}
    }
    /**
     * 创建一个用户
     */
    async create() {
        const {
            ctx,
            service
        } = this;
        let user = ctx.request.body
        await service.user.create(user)
        ctx.body = {
            status: 200,
            data: {},
            message: "创建成功"
        }
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
        let result = await service.user.getUserById(id)
        ctx.body = {
            result
        }
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
        let user = ctx.request.body
        user.id = id
        let {
            affectedRows
        } = await service.user.update(user)

        ctx.body = {
            code: affectedRows === 1 ? 200 : 500,
            data: {},
            message: affectedRows === 1 ? "更新成功" : "更新失败"
        }
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
        } = await service.user.destroy(id)
        ctx.body = {
            code: affectedRows === 1 ? 200 : 500,
            data: {},
            message: affectedRows === 1 ? "删除成功" : "删除失败"
        }
    }

    /**
     * get请求的修改操作
     */
    async edit() {
        const {
            ctx,
            service
        } = this;
        ctx.body = {

        }
    }
}
module.exports = UserController