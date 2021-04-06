const BaseController = require("./base.js");
const svgCaptcha = require("svg-captcha");
const { sign, verify } = require("jsonwebtoken");
class UserController extends BaseController {
  constructor(...args) {
    super(...args);

    this.entity = "user";
  }

  /**
   * 生成svg的验证码
   */
  async captcha() {
    const { ctx } = this;
    const captcha = svgCaptcha.create();
    // 将文本信息存储在当前会话之中
    ctx.session.captcha = captcha.text;
    ctx.set("Content-Type", "image/svg+xml");
    ctx.body = captcha.data;
  }
  /**
   * 验证验证码是否正确
   */
  async checkCaptcha() {
    const { ctx } = this;
    let { captcha } = ctx.request.body;
    if (captcha.toLowerCase() === ctx.session.captcha.toLowerCase()) {
      this.success(200, {}, "验证成功");
    } else {
      this.success(500, {}, "验证码错误");
    }
  }
  /**
   * 登录
   */
  async signIn() {
    try {
      const { ctx, service } = this;
      const loginInfo = ctx.request.body;
      let result = await service.user.signIn(loginInfo);
      if (result.status) {
        let u = JSON.parse(JSON.stringify(result.data));
        delete u.password;
        this.success(200, sign(u, this.config.jwtSecret), result.msg);
      } else {
        this.error(500, {}, result.msg);
      }
    } catch (error) {
      this.error(500, {}, error.toString());
    }
  }
  /**
   * 登出
   */
  async signOut() {
    const { ctx, service } = this;
  }

  /**
   * 注册
   */
  async signUp() {
    try {
      const { ctx, service } = this;
      const user = ctx.request.body;
      let result = await service.user.signUp(user);
      if (result.affectedRows > 0) {
        this.success(
          200,
          {
            id: result.insertId,
          },
          "注册成功"
        );
      } else {
        this.error(500, {}, result.msg);
      }
    } catch (error) {
      this.error(500, {}, error);
    }
  }

  /**
   * 获取用户的信息
   */
  async getUserInfoByToken(){
    try {
      const {ctx} = this
      this.success(200, ctx.session.user, "获取成功")
    } catch (error) {
      this.error(500, {}, error)
    }
  }
}
module.exports = UserController;
