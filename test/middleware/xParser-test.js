var vows = require('vows');
var assert = require('assert');
var util = require('util');
var IQ = require('junction').elements.IQ;
var Presence = require('junction').elements.Presence;
var X = require('junction-muc/elements/x');
var xParser = require('junction-muc/middleware/xParser');


vows.describe('xParser').addBatch({

  'middleware': {
    topic: function() {
      return xParser();
    },
    
    'when handling a presence stanza with MUC extensions': {
      topic: function(xParser) {
        var self = this;
        var pres = new Presence('darkcave@chat.shakespeare.lit/thirdwitch', 'hag66@shakespeare.lit/pda', '');
        var xEl = new X();
        pres.c(xEl);
        pres = pres.toXML();
        
        function next(err) {
          self.callback(err, pres);
        }
        process.nextTick(function () {
          xParser(pres, next)
        });
      },
      
      'should set supportsMUC property' : function(err, stanza) {
        assert.isTrue(stanza.supportsMUC);
      },
    },
    
    'when handling a presence stanza without MUC extensions': {
      topic: function(xParser) {
        var self = this;
        var pres = new Presence('darkcave@chat.shakespeare.lit/thirdwitch', 'hag66@shakespeare.lit/pda', '');
        pres = pres.toXML();
        
        function next(err) {
          self.callback(err, pres);
        }
        process.nextTick(function () {
          xParser(pres, next)
        });
      },
      
      'should leave supportsMUC property undefined' : function(err, stanza) {
        assert.isUndefined(stanza.supportsMUC);
      },
    },
    
    'when handling a non-presence stanza': {
      topic: function(xParser) {
        var self = this;
        var iq = new IQ('romeo@example.net', 'juliet@example.com', 'get');
        iq = iq.toXML();
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          xParser(iq, next)
        });
      },
      
      'should not set supportsMUC property' : function(err, stanza) {
        assert.isUndefined(stanza.query);
      },
    },
  },

}).export(module);
