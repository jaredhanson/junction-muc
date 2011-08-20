var junction = require('junction');
var util = require('util');


module.exports = function xParser(options) {
  options = options || {};
  
  return function xParser(stanza, next) {
    if (!stanza.is('presence')) { return next(); }
    
    var x = stanza.getChild('x', 'http://jabber.org/protocol/muc');
    if (!x) { return next(); }
    
    var password = x.getChild('password');
    if (password) {
      stanza.password = password.getText();
    }
    
    // TODO: Inspect the 'x' element for history criteria, if supplied.
    
    stanza.supportsMUC = true;
    next();
  }
}
