var vows = require('vows');
var assert = require('assert');
var Status = require('junction-muc/elements/status');


vows.describe('Status').addBatch({

  'when constructed with a code': {
    topic: function() {
      return new Status(110);
    },
    
    'should build correct XML string': function(status) {
      assert.equal(status.toXML().toString(), '<status code="110"/>');
    },
  },

}).export(module);
