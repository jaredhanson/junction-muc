var vows = require('vows');
var assert = require('assert');
var util = require('util');
var IQ = require('junction').elements.IQ;
var Presence = require('junction').elements.Presence;
var StanzaError = require('junction').StanzaError;
var unavailable = require('junction-muc/middleware/unavailable');


vows.describe('unavailable').addBatch({

  'middleware': {
    topic: function() {
      return unavailable();
    },
    
    'when handling an unavailable presence stanza': {
      topic: function(unavailable) {
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
          unavailable(pres, next)
        });
      },
      
      'should set action property' : function(err, stanza) {
        assert.equal(stanza.action, 'exit');
      },
      'should set room property' : function(err, stanza) {
        assert.equal(stanza.room, 'darkcave');
      },
      'should set nickname property' : function(err, stanza) {
        assert.equal(stanza.nickname, 'thirdwitch');
      },
    },
    
    'when handling a presence stanza': {
      topic: function(unavailable) {
        var self = this;
        var pres = new Presence('darkcave@chat.shakespeare.lit/thirdwitch', 'hag66@shakespeare.lit/pda');
        pres = pres.toXML();
        pres.id = pres.attrs.id;
        pres.from = pres.attrs.from;
        pres.to = pres.attrs.to;
        pres.type = pres.attrs.type;
        
        function next(err) {
          self.callback(err, pres);
        }
        process.nextTick(function () {
          unavailable(pres, next)
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
