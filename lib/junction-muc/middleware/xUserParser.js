var junction = require('junction');
var util = require('util');


module.exports = function xUserParser(options) {
  options = options || {};
  
  return function xUserParser(stanza, next) {
    if (!stanza.is('presence')) { return next(); }
    
    var x = stanza.getChild('x', 'http://jabber.org/protocol/muc#user');
    if (!x) { return next(); }
    
    var item = x.getChild('item');
    if (item) {
      stanza.affiliation = item.attrs.affiliation;
      stanza.role = item.attrs.role;
    }
    
    x.getChildren('status').forEach(function(status) {
      stanza.statuses = stanza.statuses || [];
      stanza.statuses.push(status.attrs.code);
    });
    if (stanza.statuses) {
      stanza.status = stanza.statuses[0];
    }
    
    next();
  }
}
