var util = require('util');
var Element = require('junction').elements.Element;

function Item(affiliation, role, jid, nick) {
  Element.call(this, 'item');
  this.affiliation = affiliation;
  this.role = role;
  this.jid = jid;
  this.nick = nick;
}

util.inherits(Item, Element);

Item.prototype.xmlAttributes = function() {
  return { affiliation: this.affiliation, role: this.role, jid: this.jid, nick: this.nick };
}


exports = module.exports = Item;
