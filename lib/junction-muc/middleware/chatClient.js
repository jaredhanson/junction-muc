var junction = require('junction');
var util = require('util');


module.exports = function chat(options) {
  options = options || {};
  
  return function chat(stanza, next) {
    if (!stanza.is('message')) { return next(); }
    if (stanza.type != 'groupchat') { return next(); }
    
    var from = (stanza.from instanceof junction.JID) ? stanza.from : new junction.JID(stanza.from);
    
    // TODO: Implement support for delayed delivery extensions.
    
    stanza.action = 'chat';
    stanza.room = from.user;
    stanza.nickname = from.resource;
    next();
  }
}
