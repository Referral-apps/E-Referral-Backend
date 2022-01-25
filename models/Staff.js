const mongoose = require('mongoose')

const StaffSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String, 
    },
    lastName: {
        type: String, 
        required: true
    },
    contact: {
        type: String 
        
    },
    region:{
        type: String, 
        required: true
    },
    district: {
        type: String
    },
    facility: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Facility"
     },
     role:{
         type: String,
         required: true
     },
     email: {
         type: String, 
         required: true
     },
     password: {
         type: String,
         required: true
     },
     signature:{
         type: String
     }

})

module.exports = mongoose.model('Staff', StaffSchema)