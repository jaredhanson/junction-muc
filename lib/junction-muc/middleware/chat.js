var junction = require('junction');
var util = require('util');


module.exports = function chat(options) {
  options = options || {};
  
  return function chat(stanza, next) {
    if (!stanza.is('message')) { return next(); }
    if (stanza.type != 'groupchat') { return next(); }
    
    var to = (stanza.from instanceof junction.JID) ? stanza.from : new junction.JID(stanza.from);
    
    stanza.action = 'chat';
    stanza.room = to.user;
    next();
  }
}
