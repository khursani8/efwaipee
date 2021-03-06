'use strict';

import mongoose, { Schema } from 'mongoose';
import {
    registerEvents
} from './thesis.events';

var ThesisSchema = new mongoose.Schema({
    name: String,
    studentId: String,
    studentName: String,
    examinerName: String,
    examinerId: String,
    examinerPhone:String,
    checkpoint: {
        type:Number,
        default:1,
        max:4
    },
    dateReceived:{
        type:Date,
        default:null
    }
});

registerEvents(ThesisSchema);
export default mongoose.model('Thesis', ThesisSchema);