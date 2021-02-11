const BaseService = require("./base.js")

class UserService extends BaseService {
    constructor(...args) {
        super(...args);

        this.entity_table = "cms_user";
    }
}
module.exports = UserService