'use strict';

import mongoose, { Schema } from 'mongoose';
import {
    registerEvents
} from './thesis.events';

var ThesisSchema = new mongoose.Schema({
    name: String,
    studentId: String,
    examinerId: String,
    checkpoint: String
});

registerEvents(ThesisSchema);
export default mongoose.model('Thesis', ThesisSchema);