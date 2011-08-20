var junction = require('junction');
var util = require('util');
var Router = require('./router');

function Client(options) {
  junction.Client.call(this, options);
  this.init();
}

util.inherits(Client, junction.Client);

Client.prototype.init = function() {
  var self = this;
  
  this._router = new Router();
  this.__defineGetter__('router', function() {
    this._usedRouter = true;
    return self._router.middleware;
  });
}


var actions = require('./actions');

actions.forEach(function(action) {
  var method = action;
  Client.prototype[method] = function(room) {
    var args = [action].concat(Array.prototype.slice.call(arguments));
    // Delay use of the router, causing it to be low on the stack, thus not
    // consuming stanzas before they have a chance to be logged, etc.
    if (!this._usedRouter) {
      this.use(junction.messageParser());
      this.use(junction.presenceParser());
      this.use(require('./middleware/xParser')());
      this.use(require('./middleware/xUserParser')());
      this.use(require('./middleware/chat')());
      this.use(require('./middleware/message')());
      this.use(require('./middleware/presence')());
      this.use(require('./middleware/unavailable')());
      this.use(this.router);
    }
    return this._router._route.apply(this._router, args);
  }
});

module.exports = Client;
