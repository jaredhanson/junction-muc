var Route = require('./route');

function Router() {
  var self = this;
  this._routes = {};

  this.middleware = function(stanza, next) {
    self._dispatch(stanza, next);
  };
}

Router.prototype._dispatch = function(stanza, next) {
  var self = this;
  
  (function pass(i) {
    var route = self._match(stanza, i);
    if (!route) { return next(); }
    
    var idx = 0;
    
    function nextRoute() {
      pass(i + 1);
    }
    
    function middleware(err) {
      var fn = route.middleware[idx++];
      if ('route' == err) {
        nextRoute();
      } else if (err) {
        next(err);
      } else if (fn) {
        fn(stanza, middleware);
      } else {
        done();
      }
    };
    
    function done() {
      route.callback.call(self, stanza, function(err) {
        if (err) { return next(err); }
        pass(i + 1);
      });
    }
    
    middleware();
  })(0);
}

Router.prototype._match = function(stanza, i) {
  var action = stanza.action;
  var room = stanza.room;
  var routes;
  var route;
  
  if (routes = this._routes[action]) {
    for (var len = routes.length; i < len; i++) {
      route = routes[i];
      if (route.match(room)) {
        return route;
      }
    }
  }
  return null;
}

Router.prototype._route = function(action, room, fn) {
  var middleware = [];

  // slice middleware
  // @todo: Implement this
  /*
  if (arguments.length > 3) {
    middleware = toArray(arguments, 2);
    fn = middleware.pop();
    middleware = utils.flatten(middleware);
  }
  */

  // ensure path and callback are given
  // @todo: Implement this
  /*
  if (!path) throw new Error(action + 'route requires a path');
  if (!fn) throw new Error(action + ' route ' + path + ' requires a callback');
  */
  
  var route = new Route(action, room, fn, {
    middleware: middleware
  });

  (this._routes[action] = this._routes[action] || [])
    .push(route);
  return this;
};


module.exports = Router;
