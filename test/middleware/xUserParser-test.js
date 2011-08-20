var vows = require('vows');
var assert = require('assert');
var util = require('util');
var IQ = require('junction').elements.IQ;
var Presence = require('junction').elements.Presence;
var X = require('junction-muc/elements/x');
var Item = require('junction-muc/elements/item');
var Status = require('junction-muc/elements/status');
var xUserParser = require('junction-muc/middleware/xUserParser');


vows.describe('xUserParser').addBatch({

  'middleware': {
    topic: function() {
      return xUserParser();
    },
    
    'when handling a presence stanza with a MUC user item': {
      topic: function(xUserParser) {
        var self = this;
        var pres = new Presence('hag66@shakespeare.lit/pda', 'darkcave@chat.shakespeare.lit/firstwitch', '');
        var xEl = new X('http://jabber.org/protocol/muc#user');
        var itemEl = new Item('owner', 'moderator', 'crone1@shakespeare.lit/desktop', 'oldhag');
        pres.c(xEl).c(itemEl);
        pres = pres.toXML();
        
        function next(err) {
          self.callback(err, pres);
        }
        process.nextTick(function () {
          xUserParser(pres, next)
        });
      },
      
      'should set affiliation property' : function(err, stanza) {
        assert.equal(stanza.affiliation, 'owner');
      },
      'should set role property' : function(err, stanza) {
        assert.equal(stanza.role, 'moderator');
      },
      'should set fullJID property' : function(err, stanza) {
        assert.equal(stanza.fullJID, 'crone1@shakespeare.lit/desktop');
      },
      'should set newNickname property' : function(err, stanza) {
        assert.equal(stanza.newNickname, 'oldhag');
      },
      'should not set status property' : function(err, stanza) {
        assert.isUndefined(stanza.status);
      },
      'should not set statuses property' : function(err, stanza) {
        assert.isUndefined(stanza.statuses);
      },
    },
    
    'when handling a presence stanza with a MUC status': {
      topic: function(xUserParser) {
        var self = this;
        var pres = new Presence('hag66@shakespeare.lit/pda', 'darkcave@chat.shakespeare.lit/firstwitch', '');
        var xEl = new X('http://jabber.org/protocol/muc#user');
        var statusEl = new Status(110);
        pres.c(xEl).c(statusEl);
        pres = pres.toXML();
        
        function next(err) {
          self.callback(err, pres);
        }
        process.nextTick(function () {
          xUserParser(pres, next)
        });
      },
      
      'should not set affiliation property' : function(err, stanza) {
        assert.isUndefined(stanza.affiliation);
      },
      'should not set role property' : function(err, stanza) {
        assert.isUndefined(stanza.role);
      },
      'should set status property' : function(err, stanza) {
        assert.equal(stanza.status, 110);
      },
      'should set statuses property' : function(err, stanza) {
        assert.length(stanza.statuses, 1);
        assert.equal(stanza.statuses[0], 110);
      },
    },
    
    'when handling a presence stanza with multiple MUC statuses': {
      topic: function(xUserParser) {
        var self = this;
        var pres = new Presence('hag66@shakespeare.lit/pda', 'darkcave@chat.shakespeare.lit/firstwitch', '');
        var xEl = new X('http://jabber.org/protocol/muc#user');
        var statusEl1 = new Status(110);
        var statusEl2 = new Status(210);
        pres.c(xEl).c(statusEl1).up().c(statusEl2);
        pres = pres.toXML();
        
        function next(err) {
          self.callback(err, pres);
        }
        process.nextTick(function () {
          xUserParser(pres, next)
        });
      },
      
      'should not set affiliation property' : function(err, stanza) {
        assert.isUndefined(stanza.affiliation);
      },
      'should not set role property' : function(err, stanza) {
        assert.isUndefined(stanza.role);
      },
      'should set status property' : function(err, stanza) {
        assert.equal(stanza.status, 110);
      },
      'should set statuses property' : function(err, stanza) {
        assert.length(stanza.statuses, 2);
        assert.equal(stanza.statuses[0], 110);
        assert.equal(stanza.statuses[1], 210);
      },
    },
    
    'when handling a non-presence stanza': {
      topic: function(xUserParser) {
        var self = this;
        var iq = new IQ('romeo@example.net', 'juliet@example.com', 'get');
        iq = iq.toXML();
        
        function next(err) {
          self.callback(err, iq);
        }
        process.nextTick(function () {
          xUserParser(iq, next)
        });
      },
      
      'should not set affiliation property' : function(err, stanza) {
        assert.isUndefined(stanza.affiliation);
      },
      'should not set role property' : function(err, stanza) {
        assert.isUndefined(stanza.role);
      },
    },
  },

}).export(module);
