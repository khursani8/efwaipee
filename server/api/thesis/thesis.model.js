'use strict';

import mongoose, { Schema } from 'mongoose';
import {
    registerEvents
} from './thesis.events';

var ThesisSchema = new mongoose.Schema({
    name: String,
    studentId: String,
    examinerId: String,
    checkpoint: {
        type:Number,
        default:0
    }
});

registerEvents(ThesisSchema);
export default mongoose.model('Thesis', ThesisSchema);