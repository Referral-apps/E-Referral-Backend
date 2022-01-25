const mongoose = require('mongoose')

const ForwardDetailSchema = mongoose.Schema({
    forwardingFacility: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Facility"
    },
    forwardingTo: {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Facility"
    }, 
    time: {
        type: Date,
        default: new Date() 
    }, 
    reason: {
        type: String
    }
    
})

module.exports = mongoose.model('ForwardDetail', ForwardDetailSchema)