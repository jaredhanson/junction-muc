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

}).export(module);
