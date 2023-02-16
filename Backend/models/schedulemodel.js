const mongoose = require('mongoose')

const Schema = mongoose.Schema

const scheduleSchema = new Schema({
    
    date: {
        type: String,
        required: true
    },
    className: {
        type: String,
        required: true
    },
    timeFrom: {
        type: String,
        required: true
    },
    timeTo: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        required: true
    }
    
    
}, { timestamps: true})

module.exports = mongoose.model('schedule',scheduleSchema)