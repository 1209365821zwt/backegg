'use strict';
const Service = require('egg').Service;
const classfiyData = require('../data/classify');
const productData = require('../data/product');
class TestService extends Service {
  insertClassify(data, id) {
    data.forEach(item => {
      this.app.mysql.insert('classify', {
        title: item.categoryName,
        parent_id: id,
      }).then(res => {
        if (item.childCategoryList.length >= 1) {
          this.insertClassify(item.childCategoryList, res.insertId);
        }
      });
    });
  }
  async ImportClassify() {
    const data = classfiyData.data.wareCategory[0].categoryList;
    this.insertClassify(data, 0);
    return '';
  }
  async ImportProduct() {
    const data = productData.data.wareList;
    const promises = [];
    data.forEach(item => {
      promises.push(this.app.mysql.insert('production', {
        name: item.wareName,
        cover: item.wareImg,
        images: JSON.stringify([
          item.wareImg,
          item.wareImg,
          item.wareImg,
        ]),
        price: item.warePrice / 100,
        oldPrice: item.onlinePrice / 100,
        count: item.mainSecondCmCat,
        sales: 0,
        specs: JSON.stringify([
          { key: '类别', value: '其他' },
          { key: '包装', value: '呆滞状' },
        ]),
        classfiy_id: 20,
        detail: '<img src="https://img.dmallcdn.com/20191105/9689a08d-5a0b-49b9-b5b0-b97a0d42147d_240x240H" alt="">',
      }));
    });
    const res = await Promise.all(promises);
    console.log(promises);
    return res;
  }
}
module.exports = TestService;
