const bookingModel = require('../models/bookingModel')
const userModel = require('../models/userModel')
const validations = require('../validations/validations')

const bookSlot = async function (req, res) {
    try {
        let userPresent = req.userPresent
        let data = req.body
        if (!validations.isValidInput(data)) return res.status(400).send({ status: false, message: 'Input is required.' })
        let { date, slot, dose } = data
        if (!validations.isValidDate(date)) return res.status(400).send({ status: false, message: 'Date is invalid. Please provide date in yyyy-mm-dd format for ex: 2014-04-14.' })
        if (!validations.isValidSlot(slot)) return res.status(400).send({ status: false, message: 'Slot is invalid. Please provide proper slot format for ex: 11:00 AM-11:30 AM.' })
        if (!validations.isValidDose(dose)) return res.status(400).send({ status: false, message: 'Please provide a proper dose.' })
        if (dose == 'Second dose' && userPresent.vaccinationStatus == 'none') {
            return res.status(400).send({ status: false, message: 'Please complete your first dose before applying for second dose.' })
        }
        let alreadyApplied = await bookingModel.findOne({ userId: userPresent._id })
        if (alreadyApplied) return res.status(400).send({ status: false, message: 'You already have an incomplete booking.' })
        let availableSlot = await bookingModel.find({ slot: slot })
        if (availableSlot.length == 10) {
            return res.status(400).send({ status: false, message: 'This slot is booked completely.' })
        }
        data.userId = userPresent._id
        const bookSlot = await bookingModel.create(data);
        res.status(201).send({ status: true, message: `You have booked ${slot} slot`, booking: bookSlot });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const seeAvailableSlots = async function (req, res) {
    try {
        let date = req.query.date
        let bookedSlots = await bookingModel.find({ date: date })
        let availableSlots = []
        let doseLookingFor;
        let slots = [
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

        if (req.vaccinationStatus == 'none') {
            doseLookingFor = 'First dose'
        } else {
            doseLookingFor = 'Second dose'
        }

        for (let i of slots) {
            let bookings = bookedSlots.filter(a => {
                return a.slot == i && a.dose == doseLookingFor
            })
            let temp = { slot: i, vaccinesAvailable: 10 - bookings.length }
            availableSlots.push(temp)
        }
        res.status(200).send({ status: true, dose: doseLookingFor, Available_Slots: availableSlots });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const updateSlot = async function (req, res) {
    try {
        let userPresent = req.userPresent
        let userId = userPresent._id
        let bookedSlot = await bookingModel.findOne({ userId: userId })
        if (!bookedSlot) return res.status(400).send({ status: false, message: 'User has not booked any slot yet.' })
        let updatedTime = bookedSlot.updatedAt
        let presentDate = Math.floor(Date() / 1000)
        let previousDate = Math.floor(Date(updatedTime) / 1000)
        if (presentDate - previousDate >= 86400) {
            return res.status(400).send({ status: false, message: 'You can only change your slot before 24 hours.' })
        }
        let { changeTimeSlot } = req.body
        let lengthOfSlot = await bookingModel.find({ slot: changeTimeSlot })
        if (lengthOfSlot.length == 10) {
            return res.status(400).send({ status: false, message: 'This slot is booked completely.' })
        }
        await bookingModel.findOneAndUpdate({ _id: bookedSlot._id }, { $set: { slot: changeTimeSlot } })
        res.status(200).send({ status: true, message: `You have updated your slot to ${changeTimeSlot} slot` });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { bookSlot, seeAvailableSlots, updateSlot }