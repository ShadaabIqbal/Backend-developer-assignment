const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const bookingSchema = new mongoose.Schema({
    userId: {
        type: objectId,
        required: true,
        ref: 'user'
    },
    date: {
        type: Date,
        required: true,
        min: '2021-06-01',
        max: '2021-06-30'
    },
    slot: {
        type: String,
        required: true,
        enum: [
            '10:00 AM-10:30 AM',
            '10:30 AM-11:00 AM',
            '11:00 AM-11:30 AM',
            '11:30 AM-12:00 PM',
            '12:00 PM-12:30 PM',
            '12:30 PM-1:00 PM',
            '1:00 PM-1:30 PM',
            '1:30 PM-2:00 PM',
            '2:00 PM-2:30 PM',
            '2:30 PM-3:00 PM',
            '3:00 PM-3:30 PM',
            '3:30 PM-4:00 PM',
            '4:00 PM-4:30 PM',
            '4:30 PM-5:00 PM'
        ]
    },
    dose: {
        type: String,
        required: true,
        enum: ['First dose', 'Second dose']
    }
}, { timestamps: true })

module.exports = mongoose.model('booking', bookingSchema)