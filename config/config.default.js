/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // cookie的值
  config.keys = appInfo.name + '_1612103033046_2684';

  config.middleware = ['gzip'];

  const userConfig = {
    security: {
      csrf: false
    },
    mysql: {
      client: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "123456",
        database: "cms"
      }
    },
    logger: {
      dir: "../logs/cms-api/"
    },
    // 配置需要的中间件，数组顺序即为中间件的加载顺序
    gzip: {
      threshold: 1024, // 小于 1k 的响应体不压缩
    },
    bodyParser: {
      enable: true
    }
  };

  return {
    ...config,
    ...userConfig,
  };
};
