const BaseService = require("./base.js");
const crypto = require("crypto");
class UserService extends BaseService {
  constructor(...args) {
    super(...args);

    this.entity_table = "cms_user";
  }
  /**
   * 重写用户list
   */
  async list(pageNum, pageSize, where) {
    let users = await this.app.mysql.select(this.entity_table, {
      where,
      order: [["id", "asc"]],
      offset: (pageNum - 1) * pageSize,
      limit: pageSize,
    });
    for (let i = 0; i < users.length; i++) {
      let user = users[i];
      const resources = await this.app.mysql.query(
        `SELECT cms_resource.* FROM cms_resource INNER JOIN role_resource ON cms_resource.id = 
        role_resource.resource_id INNER JOIN role_user ON role_resource.role_id = role_user.role_id 
        WHERE role_user.user_id = ?`,
        [user.id]
      );
      // 把得到的结果进行树级菜单处理
      let map = {};
      let sourceMenus = [];
      resources.forEach((resource) => {
        resource.children = [];
        map[resource.id] = resource;
        // 如果你的parent_id为0那么我们认为就把资源放入这一层中
        if (resource.parent_id === 0) {
          sourceMenus.push(resource);
        } else {
          map[resource.parent_id].children.push(resource);
        }
      });
      user.resources = resources;
    }
    return users;
  }
  /**
   * 注册成功
   * @param {*} user
   */
  async signUp(user) {
    const { app } = this;
    const conn = await app.mysql.beginTransaction();
    try {
      // 选查询该用户是否已注册
      let querys = await app.mysql.query(
        "SELECT id FROM cms_user WHERE email=? or username=?",
        [user.email, user.username]
      );
      if (querys.length > 0) {
        return {
          msg: "该用户已注册",
        };
      }
      user.password = crypto
        .createHash("md5")
        .update(user.password)
        .digest("hex");
        user.address = JSON.stringify(user.address)
      let result = await app.mysql.insert("cms_user", user);
      await conn.commit();
      return result;
    } catch (error) {
      await conn.rollback();
      return {
        msg: error.toString(),
      };
    }
  }

  /**
   * 登录
   * @param {*} loginInfo
   */
  async signIn(loginInfo) {
    try {
      const { app } = this;
      let result = await app.mysql.query(
        "SELECT * FROM cms_user WHERE username=? or email =? and password=?",
        [
          loginInfo.username,
          loginInfo.username,
          crypto.createHash("md5").update(loginInfo.password).digest("hex"),
        ]
      );
      if (result.length > 0) {
        let user = result[0]
        user.sessionTime = Date.now() + 1000 * 60 * 60 * 24 * 2
        // 验证码密码是否错误
        return {
          status: true,
          msg: "登录成功",
          data: user
        };
      } else {
        return {
          status: false,
          msg: "用户不存在",
        };
      }
    } catch (error) {
      return {
        status: false,
        msg: error.toString(),
      };
    }
  }
}
module.exports = UserService;
