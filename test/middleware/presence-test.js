var vows = require('vows');
var assert = require('assert');
var util = require('util');
var IQ = require('junction').elements.IQ;
var Presence = require('junction').elements.Presence;
var StanzaError = require('junction').StanzaError;
var presence = require('junction-muc/middleware/presence');


vows.describe('presence').addBatch({

  'middleware': {
    topic: function() {
      return presence();
    },
    
    'when handling a presence stanza': {
      topic: function(presence) {
        var self = this;
        var pres = new Presence('darkcave@chat.shakespeare.lit/thirdwitch', 'hag66@shakespeare.lit/pda', '');
        pres = pres.toXML();
        pres.id = pres.attrs.id;
        pres.from = pres.attrs.from;
        pres.to = pres.attrs.to;
        pres.type = pres.attrs.type;
        
        function next(err) {
          self.callback(err, pres);
        }
        process.nextTick(function () {
          presence(pres, next)
        });
      },
      
      'should set action property' : function(err, stanza) {
        assert.equal(stanza.action, 'enter');
      },
      'should set room property' : function(err, stanza) {
        assert.equal(stanza.room, 'darkcave');
      },
      'should set nickname property' : function(err, stanza) {
        assert.equal(stanza.nickname, 'thirdwitch');
      },
    },
    
    'when handling a presence stanza that does not specify a room nickname': {
      topic: function(presence) {
        var self = this;
        var pres = new Presence('darkcave@chat.shakespeare.lit', 'hag66@shakespeare.lit/pda', '');
        pres = pres.toXML();
        pres.id = pres.attrs.id;
        pres.from = pres.attrs.from;
        pres.to = pres.attrs.to;
        pres.type = pres.attrs.type;
        
        function next(err) {
          self.callback(err, pres);
        }
        process.nextTick(function () {
          presence(pres, next)
        });
      },
      
      'should indicate an error' : function(err, stanza) {
        assert.instanceOf(err, StanzaError);
        assert.equal(err.type, 'modify');
        assert.equal(err.condition, 'jid-malformed');
      },
    },
    
    'when handling an unavailable presence stanza': {
      topic: function(presence) {
        var self = this;
        var pres = new Presence('darkcave@chat.shakespeare.lit/thirdwitch', 'hag66@shakespeare.lit/pda', 'unavailable');
        pres = pres.toXML();
        pres.id = pres.attrs.id;
        pres.from = pres.attrs.from;
        pres.to = pres.attrs.to;
        pres.type = pres.attrs.type;
        
        function next(err) {
          self.callback(err, pres);
        }
        process.nextTick(function () {
          presence(pres, next)
        });
      },
      
      'should not set action property' : function(err, stanza) {
        assert.isUndefined(stanza.action);
      },
      'should not set room property' : function(err, stanza) {
        assert.isUndefined(stanza.room);
      },
      'should not set nickname property' : function(err, stanza) {
        assert.isUndefined(stanza.nickname);
      },
    },
    
    'when handling a non-presence stanza': {
      topic: function(presence) {
        var self = this;
        var iq = new IQ('romeo@example.net', 'juliet@example.com', 'get');
        iq = iq.toXML();
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          presence(iq, next)
        });
      },
      
      'should not set action property' : function(err, stanza) {
        assert.isUndefined(stanza.action);
      },
      'should not set room property' : function(err, stanza) {
        assert.isUndefined(stanza.room);
      },
      'should not set nickname property' : function(err, stanza) {
        assert.isUndefined(stanza.nickname);
      },
    },
  },

}).export(module);
