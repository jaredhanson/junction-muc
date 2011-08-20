var junction = require('junction');
var util = require('util');


module.exports = function unavailable(options) {
  options = options || {};
  
  return function unavailable(stanza, next) {
    if (!stanza.is('presence')) { return next(); }
    if (stanza.type != 'unavailable') { return next(); }
    
    var to = (stanza.to instanceof junction.JID) ? stanza.to : new junction.JID(stanza.to);
    
    stanza.action = 'exit';
    stanza.room = to.user;
    stanza.nickname = to.resource;
    next();
  }
}
