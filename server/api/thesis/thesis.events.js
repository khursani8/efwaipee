/**
 * Thesis model events
 */

'use strict';

import {EventEmitter} from 'events';
var ThesisEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ThesisEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Thesis) {
  for(var e in events) {
    let event = events[e];
    Thesis.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    ThesisEvents.emit(event + ':' + doc._id, doc);
    ThesisEvents.emit(event, doc);
  };
}

export {registerEvents};
export default ThesisEvents;
