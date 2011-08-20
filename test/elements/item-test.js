var vows = require('vows');
var assert = require('assert');
var Item = require('junction-muc/elements/item');


vows.describe('Item').addBatch({

  'when constructed with an affiliation and role': {
    topic: function() {
      return new Item('owner', 'moderator');
    },
    
    'should build correct XML string': function(item) {
      assert.equal(item.toXML().toString(), '<item affiliation="owner" role="moderator"/>');
    },
  },
  
  'when constructed with an affiliation, role, and JID': {
    topic: function() {
      return new Item('none', 'participant', 'hag66@shakespeare.lit/pda');
    },
    
    'should build correct XML string': function(item) {
      assert.equal(item.toXML().toString(), '<item affiliation="none" role="participant" jid="hag66@shakespeare.lit/pda"/>');
    },
  },
  
  'when constructed with an affiliation, role, JID, and nickname': {
    topic: function() {
      return new Item('none', 'participant', 'hag66@shakespeare.lit/pda', 'oldhag');
    },
    
    'should build correct XML string': function(item) {
      assert.equal(item.toXML().toString(), '<item affiliation="none" role="participant" jid="hag66@shakespeare.lit/pda" nick="oldhag"/>');
    },
  },

}).export(module);
