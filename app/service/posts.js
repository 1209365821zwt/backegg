'use strict';
const Service = require('egg').Service;
class PostService extends Service {
  async insert(options) {
    const user = await this.app.mysql.insert('classify', {
      ...options,
    });
    return user;
  }
  async get(id) {
    return await this.app.mysql.get('classify', { id });
  }
  async updata(options) {
    return await this.app.mysql.update('user', {
      ...options,
    });
  }
}
module.exports = PostService;
