'use strict';

const Controller = require('egg').Controller;
const until = require('../until/until');
class ClassifyController extends Controller {
  async menu() {
    const data = await this.ctx.service.classify.menu();
    this.ctx.body = {
      code: 1,
      data: until.arrayToTree(data, 'parent_id'),
    };
  }

}
module.exports = ClassifyController
;
