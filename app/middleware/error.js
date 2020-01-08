'use strict';
module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (e) {
      ctx.response.status = e.statusCode || e.status || 500;
      if (ctx.response.status >= 500) {
        ctx.body = {
          code: 0,
          message: '网络异常请稍后再试',
        };
      } else {
        ctx.body = {
          code: 0,
          message: e.message,
        };
      }
    }
  };
};
