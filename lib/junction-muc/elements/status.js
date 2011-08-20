var util = require('util');
var Element = require('junction').elements.Element;

function Status(code) {
  Element.call(this, 'status');
  this.code = code;
}

util.inherits(Status, Element);

Status.prototype.xmlAttributes = function() {
  return { code: this.code };
}


exports = module.exports = Status;
