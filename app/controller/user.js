'use strict';
const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
// 获取随机数
const randomNum = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const randomCode = () => {
  let code = '';
  while (code.length < 6) {
    code += randomNum(0, 9);
  }
  return code;
};
class UserController extends Controller {
  // 发送验证码给用户你
  async sendcode() {
    const { ctx } = this;
    const { phone } = ctx.request.body;
    const code = randomCode();
    // 将验证码存到session中,待会判断是否存在该用户
    ctx.session.msgcode = code;
    ctx.session.phone = phone;
    // 发送到客户端
    ctx.body = {
      code: 1,
      message: `验证码${code}已发送到${phone}`,
    };
  }
  async login() {
    const { ctx } = this;
    // 获取用户的手机号和验证码
    const { phone, msgcode } = ctx.request.body;
    const code = ctx.session.msgcode;
    if (msgcode === code && phone === ctx.session.phone) {
      // 证明这个用户是存在的
      const user = await ctx.service.user.findUser(phone);
      if (user) {
        // 生成加密的token
        const token = jwt.sign({ ...user }, 'zwt', {
          expiresIn: 60 * 60 * 24,
        });
        // 发送token到客户端，以cookie的形式存储，那么登录成功后就可以早cookie中找到token；
        ctx.cookies.set('token', token, {
          httpOnly: false,
        });
        ctx.body = {
          code: 1,
          message: '登录成功',
        };
      } else {
        await ctx.service.user.insertUser(phone);
        const user = await ctx.service.user.findUser(phone);
        if (user) {
        // 生成加密的token
          const token = jwt.sign({ ...user }, 'zwt', {
            expiresIn: 60 * 60 * 24,
          });
          // 发送token到客户端，以cookie的形式存储，那么登录成功后就可以早cookie中找到token；
          ctx.cookies.set('token', token, {
            httpOnly: false,
          });
          ctx.body = {
            code: 1,
            message: '登录成功',
          };
        }
      }
    }
  }
  async info() {
    const info = this.ctx.info;
    this.ctx.body = {
      code: 1,
      data: info,
    };
  }
}
module.exports = UserController;
