const {Controller} = require('egg')
class UserController extends Controller{

    // 查询用户表功能
    async index(){
        const {ctx, service} = this
       let users =  await service.user.list()
       ctx.body = users
    }

    /**
     * 获取最新的
     */
    async new(){
        const {ctx, service} = this
        ctx.body = {}
    }
    /**
     * 创建一个用户
     */
    async create(){
        const {ctx, service} = this;
        ctx.body = {}
    }

    /**
     * 通过一个id获取数据
     */
    async show(){
        const {ctx, service} = this;
        let {id} = ctx.params
        let result = await service.user.getUserById(id)
        ctx.body = {
            result
        }
    }

    /**
     * 更新操作
     */
    async update(){
        const {ctx, service} = this;
        ctx.body = {

        }
    }

    /**
     * 删除操作 通过id
     */
    async destroy(){
        const {ctx, service} = this;
        ctx.body = {

        }
    }

    /**
     * get请求的修改操作
     */
    async edit(){
        const {ctx, service} = this;
        ctx.body = {

        }
    }
}
module.exports = UserController