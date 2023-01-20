const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validations = require('../validations/validations')

const userRegister = async function (req, res) {
    try {
        let data = req.body
        if (!validations.isValidInput(data)) return res.status(400).send({ status: false, message: 'Input is required' })
        let { Name, PhoneNumber, Password, Age, Pincode, AadharNo } = data
        if (!Name) return res.status(400).send({ status: false, message: 'Name is required' })
        if (!PhoneNumber) return res.status(400).send({ status: false, message: 'Phone number is required' })
        let checkPhone = await userModel.findOne({ PhoneNumber: PhoneNumber })
        if (checkPhone) return res.status(400).send({ status: false, message: 'Phone number already exists' })
        if (!Password) return res.status(400).send({ status: false, message: 'Password is required' })
        if (!Age) return res.status(400).send({ status: false, message: 'Age is required' })
        if (!Pincode) return res.status(400).send({ status: false, message: 'Pincode is required' })
        if (!AadharNo) return res.status(400).send({ status: false, message: 'Aadhar number is required' })
        let checkAadhar = await userModel.findOne({ AadharNo: AadharNo })
        if (checkAadhar) return res.status(400).send({ status: false, message: 'Aadhar Number already exists' })
        if (!validations.isValidName(Name)) return res.status(400).send({ status: false, message: 'Name is not valid' })
        if (!validations.isValidPhone(PhoneNumber)) return res.status(400).send({ status: false, message: 'Phone Number is not valid' })
        if (!validations.isValidPswd(Password)) return res.status(400).send({ status: false, message: 'Provide password between 8 to 15 characters with at least one capital letter and one special character for example: (!@#$%&*)' })
        if (!validations.isValidAge(Age)) return res.status(400).send({ status: false, message: 'Please provide a valid age' })
        if (!validations.isValidpincode(Pincode)) return res.status(400).send({ status: false, message: 'Pincode is not valid' })
        if (!validations.isValidAadhar(AadharNo)) return res.status(400).send({ status: false, message: 'Aadhar Number is not valid' })

        // let salt = 10
        // let hash = await bcrypt.hash(Password, salt)
        // data.Password = hash

        let createUser = await userModel.create(data)
        return res.status(201).send({ status: true, message: 'User created successfully', data: createUser })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const userLogin = async function (req, res) {
    try {
        let data = req.body
        if (!validations.isValidInput(data)) return res.status(400).send({ status: false, message: 'Input is required' })
        let { PhoneNumber, Password } = data
        if (!PhoneNumber) return res.status(400).send({ status: false, message: 'Phone Number is required' })
        if (!Password) return res.status(400).send({ status: false, message: 'Password is required' })
        let userPresent = await userModel.findOne({ PhoneNumber: PhoneNumber })
        if (!userPresent) return res.status(404).send({ status: false, message: 'User not found' })
        // let comparePassword = await bcrypt.compare(Password, userPresent.Password)
        // if (!comparePassword) return res.status(401).send({ status: false, message: 'Incorrect password' })
        let encodedToken = jwt.sign({ userId: userPresent._id, Type: userPresent.Type, vaccinationStatus: userPresent.vaccinationStatus, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) }, 'secretKey')
        return res.status(200).send({ status: true, userId: userPresent._id, token: encodedToken })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}



module.exports = { userRegister, userLogin }