const mongoose = require('mongoose');


const eventSchema = mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    date:{
        type: Date,
    },
    description:{
        type: String,
        required: true
    },
    created_by:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Event', eventSchema);