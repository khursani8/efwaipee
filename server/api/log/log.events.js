/**
 * Log model events
 */

'use strict';

import {EventEmitter} from 'events';
var LogEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LogEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Log) {
  for(var e in events) {
    let event = events[e];
    Log.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    LogEvents.emit(event + ':' + doc._id, doc);
    LogEvents.emit(event, doc);
  };
}

export {registerEvents};
export default LogEvents;
