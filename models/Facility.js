const mongoose = require('mongoose')

const FacilitySchema = mongoose.schema({
    name: {
        type: String, 
        required: true
    },
    region: {
        type: String, 
        required: true
    },
    district: {
        type: String, 
        required: true
    },
    type_of_facility: {
        type: String, 
        required: true
    }
})

module.exports = mongoose.model('Facility', FacilitySchema)