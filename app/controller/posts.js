'use strict';
const Controller = require('egg').Controller;
class PostController extends Controller {
  async index() {
    const { ctx } = this;
    const data = await this.app.mysql.select('production');
    if (data.length > 0) {
      ctx.body = {
        code: 1,
        msg: '数据获取成功',
        dada: data,
      };
    }
  }
  // 增加数据
  async create() {
    const { ctx } = this;
    const options = ctx.request.body;
    const { parent_id } = ctx.request.body;
    try {
      await ctx.service.posts.insert({
        ...options,
        parent_id,
      });
      ctx.body = {
        code: 1,
        message: '添加成功',
      };
    } catch (e) {
      ctx.throw(422, '添加失败');
    }
  }
  // 根据id找到对应的数据
  async show() {
    const { ctx } = this;
    const id = ctx.params.id;
    try {
      const data = await ctx.service.posts.get(id);
      ctx.body = {
        code: 1,
        data,

      };
    } catch (e) {
      ctx.throw(422, '获取失败');
    }
  }
  async update() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const updateData = ctx.request.body;
    try {
      await ctx.service.address.update({
        id,
        ...updateData,
      });
      ctx.body = {
        code: 1,
        message: '更新成功',
      };
    } catch (e) {
      ctx.throw(422, '更新失败');
    }
  }
}
module.exports = PostController;
