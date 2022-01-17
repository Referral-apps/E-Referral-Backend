const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

const PatientSchema = mongoose.Schema({
    regno:{
        type: String,
        required: true
    }, 

    created: {
        type: Date,
        default: new Date()
    },
    facility_referred_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facility'
    },
    facility_referred_from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Facility'
    },
    time_of_departure: {
        type: Date,
        default: new Date() 
    },
    firstname:{
        type: String,
        required: true
    },
    middlename: {
        type: String
    },
    lastname:{
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    dob:{
        type: Date,
        default: new Date()
    },
    insurance:{
        type: String,
        required: true
    },
    relative_name: {
        type: String,
    },
    contact: {
        type: String,
    },
    presenting_complaints:{
        type: String,
        required: true
    },
    exam_findings: {
        type: String,
        required: true
    },
    temperature: {
        type: String
    },
    pulse: {
        type: String
    },
    respiratory_rate: {
        type: String
    },
    weight: {
        type: String
    },
    investigation_carried:{
        type: String
    },
    diagnosis:{
        type: String
    },
    treatment_given: {
        type: String
    },
    reason_for_referral: {
        type: String
    },
    commitment_for_next_level:{
        type:String
    }
  
})

PatientSchema.plugin(AutoIncrement, {inc_field: 'id'})
module.exports = mongoose.model('Patient', PatientSchema)