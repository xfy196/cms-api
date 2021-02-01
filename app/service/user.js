const {Service} = require("egg")

class UserService extends Service{
    async list(){
        return await this.app.mysql.select("cms_user")
    }
    async getUserById(id){
        return await this.app.mysql.get("cms_user", {id})
    }
}
module.exports = UserService