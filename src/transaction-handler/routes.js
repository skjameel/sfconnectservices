const express = require('express');

module.exports = function () {
  return function () {
    const controller = require('./controller');
    const router = express.Router();

    router.get('/healthcheck', controller.healthcheck);
    
    router.get('/', controller.getAll);
    
    router.get('/delete:id', controller.delete);
    router.get('/:id', controller.get);

    router.post('/add', controller.post);
    
    router.put('/:id', controller.put);
    
    
    return router;
  };
}();
