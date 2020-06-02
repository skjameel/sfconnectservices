const express = require('express');
const router = express.Router();

module.exports = function ( app ) {
  app.use('/sfconnect/v1/:model', require('./routes')(router));
};
