const BaseController = require("./base.js")
class UserController extends BaseController {
    constructor(...args) {
        super(...args);

        this.entity = "user"
    }
}
module.exports = UserController