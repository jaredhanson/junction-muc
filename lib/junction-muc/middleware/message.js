var junction = require('junction');
var util = require('util');


module.exports = function message(options) {
  options = options || {};
  
  return function message(stanza, next) {
    if (!stanza.is('message')) { return next(); }
    if (stanza.type != 'chat' || !stanza.type) { return next(); }
    
    var to = (stanza.to instanceof junction.JID) ? stanza.to : new junction.JID(stanza.to);
    
    stanza.action = 'message';
    stanza.room = to.user;
    stanza.nickname = to.resource;
    next();
  }
}
