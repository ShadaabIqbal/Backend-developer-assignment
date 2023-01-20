const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
const adminAuth = require('../middlewares/adminAuth')

router.get('/admin/allBookings', adminAuth.adminAuth, adminController.viewAllSlots)

router.get('/admin/allUsers', adminAuth.adminAuth, adminController.viewAllUsers)

router.post('/admin/login', adminController.login)

module.exports = router