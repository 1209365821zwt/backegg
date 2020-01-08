'use strict';
const jwt = require('jsonwebtoken');
const authList = [
  '/user/info',
];
// 如果接口地址中有params参数的情况，需要会参数做特殊的处理
const findUrl = request => {
  let isUrl = false;
  let path = request.path;
  const pathArr = path.split('/');
  authList.forEach(item => {
    if (/\d{1,}/.test(pathArr[pathArr.length - 1])) {
      path = request.path.replace('/' + pathArr[pathArr.length - 1], '');
    }
    if (item === path) {
      isUrl = true;
    }
  });
  return isUrl;
};
module.exports = () => {
  return async (ctx, next) => {
    try {
      if (findUrl(ctx.request)) {
        const token = ctx.cookies.get('token');
        const info = jwt.verify(token, 'zwt');
        ctx.info = info;
        await next();
      } else {
        await next();
      }
    } catch (e) {
      if (e.status) {
        ctx.throw(e.status, e.message);
      } else {
        ctx.throw(401, '用户信息过期');
      }
    }
  };
};
