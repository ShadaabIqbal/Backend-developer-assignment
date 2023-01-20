const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const { isValidObjectId } = require('mongoose')

const userAuthentication = async function (req, res, next) {
    try {
        let token = req.headers['x-auth-token'];
        if (!token) return res.status(400).send({ status: false, message: "Token must be present." })
        jwt.verify(token, 'secretKey', function (err, decodedToken) {
            if (err) {
                return res.status(401).send({ status: false, message: 'Authentication failed.' })
            } else {
                req.decodedToken = decodedToken
                req.vaccinationStatus = decodedToken.vaccinationStatus
                return next()
            }
        })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const userAuthorization = async function (req, res, next) {
    try {
        let userId = req.params.userId
        if (!isValidObjectId(userId)) { return res.status(400).send({ status: false, message: "User id is invalid." }) }
        let userPresent = await userModel.findById(userId)
        if (!userPresent) { return res.status(404).send({ status: false, message: "User not found." }) }
        if (userPresent._id != req.decodedToken.userId) { return res.status(403).send({ status: false, message: "Unauthorized access!" }) }
        req.userPresent = userPresent
        next()
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { userAuthentication, userAuthorization }