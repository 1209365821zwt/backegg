'use strict';
const Controller = require('egg').Controller;
class TestController extends Controller {
  async import() {
    const { ctx } = this;
    try {
      await ctx.service.test.ImportClassify();
      ctx.body = {
        code: 1,
        meessage: '导入成功',
      };
    } catch (e) {
      ctx.throw(422, '导入失败');
    }
  }
  async importProduct() {
    const { ctx } = this;
    await ctx.service.test.ImportProduct();
    ctx.body = {
      code: 1,
      message: '导入成功',
    };
  }
}
module.exports = TestController
;
