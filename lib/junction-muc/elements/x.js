var util = require('util');
var Element = require('junction').elements.Element;

function X(xmlns) {
  xmlns = xmlns || 'http://jabber.org/protocol/muc';
  Element.call(this, 'x', xmlns);
}

util.inherits(X, Element);


exports = module.exports = X;
