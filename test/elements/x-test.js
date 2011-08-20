var vows = require('vows');
var assert = require('assert');
var X = require('junction-muc/elements/x');


vows.describe('X').addBatch({

  'when constructed': {
    topic: function() {
      return new X();
    },
    
    'should build correct XML string': function(x) {
      assert.equal(x.toXML().toString(), '<x xmlns="http://jabber.org/protocol/muc"/>');
    },
  },
  
  'when constructed with an XML namespace': {
    topic: function() {
      return new X('http://jabber.org/protocol/muc#user');
    },
    
    'should build correct XML string': function(x) {
      assert.equal(x.toXML().toString(), '<x xmlns="http://jabber.org/protocol/muc#user"/>');
    },
  },

}).export(module);
