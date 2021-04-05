/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // cookie的值
  config.keys = appInfo.name + "_1612103033046_2684";

  config.middleware = ["gzip", "errorHandler", "auth"];
  config.auth = {
    authUrls: ["/api/user"],
  };
  config.errorHandler = {
    enable: true,
    match(ctx) {
      // 这里可以设置对应规则去匹配，例如只在ios下开启
      const reg = /iphone|ipad|ipod/i;
      return true;
    },
  };

  const userConfig = {
    security: {
      csrf: false,
      domainWhiteList: ["http://localhost:8000"],
    },
    cors: {
      origin: ["http://localhost:8000"],
      credentials: true,
      allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
    },
    jwtSecret: "xxy",
    mysql: {
      client: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "root",
        database: "cms",
      },
    },
    logger: {
      dir: "./logs/cms-api/",
    },
    // 配置需要的中间件，数组顺序即为中间件的加载顺序
    gzip: {
      threshold: 1024, // 小于 1k 的响应体不压缩
    },
    bodyParser: {
      enable: true,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
