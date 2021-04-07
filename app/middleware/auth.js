const { verify } = require("jsonwebtoken");
function verifyToken(token, secret) {
  return new Promise((reslove, reject) => {
    verify(token, secret, (error, payload) => {
      if (error) {
        reject(error);
      } else {
        reslove(payload);
      }
    });
  });
}
module.exports = (options, app) => {
  return async (ctx, next) => {
    const authUrls = options.authUrls;
    if (authUrls.includes(ctx.url.split("?")[0])) {
      // 验证是否进行登录
      // 判断请求头中是否存在token
      const authorization = ctx.get("Authorization");
      if (authorization) {
        try {
          // 把用户信息放入到session之后提供给后面的操作使用
          let user = await verifyToken(authorization, app.config.jwtSecret);
          if (user.sessionTime < Date.now()) {
            ctx.status = 401;
            ctx.body = {
              code: 401,
              msg: "token已过期",
            };
          } else {
            ctx.session.user = user;
            await next();
          }
        } catch (error) {
          ctx.status = 401;
          ctx.body = {
            code: 401,
            msg: "token验证失败",
          };
        }
      } else {
        ctx.status = 401;
        ctx.body = {
          code: 401,
          msg: "没有token",
        };
      }
    } else {
      await next();
    }
  };
};
