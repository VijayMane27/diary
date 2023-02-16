const mongoose = require('mongoose')

const Schema = mongoose.Schema

const detailSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    Department: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    basicPay: {
        type: Number ,
        required: true 
    },
    languages: {
        type: String,
        required: true
    },
    employeeNo:{
        type: String,
        required: true
    },
    aadharNo: {
        type: Number,
        required: true
    },
    panNo: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    }
    
}, { timestamps: true})

module.exports = mongoose.model('detail',detailSchema)
