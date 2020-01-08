'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/classify', controller.class.menu);
  router.get('/user/info', controller.user.info);
  router.get('/api/test/import', controller.test.import);
  router.get('/api/test/product', controller.test.importProduct);
  router.get('/api/user/sendcode', controller.user.sendcode);
  router.post('/api/user/login', controller.user.login);
  router.resources('posts', '/api/posts', controller.posts);
  router.post('/api/posts/update', controller.posts.update);
};
