var junction = require('junction');
var util = require('util');


module.exports = function chat(options) {
  options = options || {};
  
  return function chat(stanza, next) {
    if (!stanza.is('message')) { return next(); }
    if (stanza.type != 'groupchat') { return next(); }
    
    var to = (stanza.to instanceof junction.JID) ? stanza.to : new junction.JID(stanza.to);
    
    stanza.action = 'chat';
    stanza.room = to.user;
    next();
  }
}
