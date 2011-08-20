var vows = require('vows');
var assert = require('assert');
var util = require('util');
var IQ = require('junction').elements.IQ;
var Message = require('junction').elements.Message;
var chatClient = require('junction-muc/middleware/chatClient');


vows.describe('chatClient').addBatch({

  'middleware': {
    topic: function() {
      return chatClient();
    },
    
    'when handling a message stanza': {
      topic: function(chatClient) {
        var self = this;
        var msg = new Message('hecate@shakespeare.lit/broom', 'darkcave@chat.shakespeare.lit/firstwitch', 'groupchat');
        msg = msg.toXML();
        msg.id = msg.attrs.id;
        msg.from = msg.attrs.from;
        msg.to = msg.attrs.to;
        msg.type = msg.attrs.type;
        
        function next(err) {
          self.callback(err, msg);
        }
        process.nextTick(function () {
          chatClient(msg, next)
        });
      },
      
      'should set action property' : function(err, stanza) {
        assert.equal(stanza.action, 'chat');
      },
      'should set room property' : function(err, stanza) {
        assert.equal(stanza.room, 'darkcave');
      },
      'should set nickname property' : function(err, stanza) {
        assert.equal(stanza.nickname, 'firstwitch');
      },
    },
    
    'when handling a non-groupchat message stanza': {
      topic: function(chatClient) {
        var self = this;
        var msg = new Message('hecate@shakespeare.lit/broom', 'darkcave@chat.shakespeare.lit/firstwitch', 'normal');
        msg = msg.toXML();
        msg.id = msg.attrs.id;
        msg.from = msg.attrs.from;
        msg.to = msg.attrs.to;
        msg.type = msg.attrs.type;
        
        function next(err) {
          self.callback(err, msg);
        }
        process.nextTick(function () {
          chatClient(msg, next)
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
    
    'when handling a non-message stanza': {
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
