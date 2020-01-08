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

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1578397334630_4499';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    static: {
      enable: true,
    },
    security: {
      csrf: {
        enable: false,
      },
    },
    middleware: [ 'error', 'authenation' ],
    mysql: {
      client: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123321',
        database: 'product',
      },
      app: true,
      agent: false,
    },
    session: {
      key: 'SESSION_ID',
      maxAge: 1000 * 20,
      httpOnly: true,
      encrypt: true,
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};
