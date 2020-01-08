'use strict';
const Service = require('egg').Service;
class UserService extends Service {
  async findUser(phone) {
    return await this.app.mysql.get('user', { phone });
  }
  async insertUser(phone) {
    return await this.app.mysql.insert('user', { phone });
  }

}
module.exports = UserService;
