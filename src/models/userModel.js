const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        trim: true
    },
    PhoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    Password: {
        type: String,
        required: true,
    },
    Age: {
        type: Number,
        required: true,
        trim: true
    },
    Pincode: {
        type: String,
        required: true,
    },
    AadharNo: {
        type: String,
        required: true,
    },
    vaccinationStatus: {
        type: String,
        required: true,
        enum: ['First dose completed', 'All completed', 'none'],
        default: 'none'
    },
    Type: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true })

module.exports = mongoose.model('user', userSchema)