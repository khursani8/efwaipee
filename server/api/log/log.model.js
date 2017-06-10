'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './log.events';

var LogSchema = new mongoose.Schema({
  thesisId: String,
  studentId:String,
  checkpoint: Number,
  time: Date
});

registerEvents(LogSchema);
export default mongoose.model('Log', LogSchema);
