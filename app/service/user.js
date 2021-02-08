const {Service} = require("egg")

class UserService extends Service{
    /**
     * 获取所有的用户
     */
    async list(){
        return await this.app.mysql.select("cms_user")
    }
    /**
     * 通过用户id获取的用户信息
     * @param {*} id 用户id 
     */
    async getUserById(id){
        return await this.app.mysql.get("cms_user", {id})
    }
    /**
     * 
     * 创建用户信息
     * @param {*} user 用户实体参数
     */
    async create(user){
       return await this.app.mysql.insert("cms_user", user)
    }
}
module.exports = UserService