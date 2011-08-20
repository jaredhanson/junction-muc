function Route(action, room, fn, options) {
  options = options || {};
  this.action = action;
  this.room = room;
  this.callback = fn;
  this.middleware = options.middleware;
}

Route.prototype.match = function(room) {
  // TODO: Implement regex-style matching.
  return this.room == room;
};


module.exports = Route;
