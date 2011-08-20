var Client = require('./client');

exports.createConnection = function (options) {
  // @todo: Implement support for component connections.
  return new Client(options);
};


exports.elements = {};
exports.elements.X = require('./elements/x');
exports.elements.Password = require('./elements/password');
exports.elements.Item = require('./elements/item');
exports.elements.Status = require('./elements/status');
