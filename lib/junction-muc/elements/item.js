var util = require('util');
var Element = require('junction').elements.Element;

function Item(affiliation, role) {
  Element.call(this, 'item');
  this.affiliation = affiliation;
  this.role = role;
}

util.inherits(Item, Element);

Item.prototype.xmlAttributes = function() {
  return { affiliation: this.affiliation, role: this.role };
}


exports = module.exports = Item;
