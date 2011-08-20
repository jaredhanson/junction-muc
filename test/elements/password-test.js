var vows = require('vows');
var assert = require('assert');
var Password = require('junction-muc/elements/password');


vows.describe('Password').addBatch({

  'when constructed': {
    topic: function() {
      return new Password('cauldronburn');
    },
    
    'should build correct XML string': function(password) {
      assert.equal(password.toXML().toString(), '<password>cauldronburn</password>');
    },
  },

}).export(module);
