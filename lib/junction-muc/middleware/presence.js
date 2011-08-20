var junction = require('junction');
var util = require('util');
var StanzaError = require('junction').StanzaError;


module.exports = function presence(options) {
  options = options || {};
  
  return function presence(stanza, next) {
    if (!stanza.is('presence')) { return next(); }
    if (stanza.type) { return next(); }
    
    var to = (stanza.to instanceof junction.JID) ? stanza.to : new junction.JID(stanza.to);
    
    if (!to.resource) {
      return next(new StanzaError("Must specify a room nickname.", 'modify', 'jid-malformed'));
    }
    
    stanza.action = 'enter';
    stanza.room = to.user;
    stanza.nickname = to.resource;
    next();
  }
}
