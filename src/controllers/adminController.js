const jwt = require('jsonwebtoken')
const bookingModel = require('../models/bookingModel')
const userModel = require('../models/userModel')

const viewAllSlots = async (req, res) => {
    let date = req.query.date;
    date = new Date(date)
    const allSlots = await bookingModel.find({ Day: date }).populate('User', 'Name')
    res.status(200).send({ status: true, allBookings: allSlots })
}

const viewAllUsers = async (req, res) => {

    const filter = req.query

    const allUsers = await userModel.find(filter)
    res.status(200).send({ status: true, users: allUsers })
}

const login = async (req, res) => {
    const isUserAvailable = await userModel.findOne(req.body);
    if (!isUserAvailable) {
        return res
            .status(400)
            .send({ status: false, message: "Admin not registered" });
    }
    const token = jwt.sign(
        {
            userType: isUserAvailable.Type,
            userId: isUserAvailable._id,
        },
        "secret",
        {
            expiresIn: "30m",
        }
    );
    return res.status(200).send({ status: true, Token: token });
};

module.exports = { viewAllSlots, viewAllUsers, login }