var util = require('util');
var Element = require('junction').elements.Element;

function Password(password) {
  Element.call(this, 'password');
  this.t(password);
}

util.inherits(Password, Element);


exports = module.exports = Password;
