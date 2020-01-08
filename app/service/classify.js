'use strict';

const Service = require('egg').Service;

class ClassifyService extends Service {
  async menu() {
    const menu = await this.app.mysql.select('classify');
    return menu;
  }
}
module.exports = ClassifyService;
