const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bookingController = require('../controllers/bookingController');
const userAuth = require('../middlewares/userAuth')
const { userAuthentication, userAuthorization } = userAuth

router.post('/register', userController.userRegister);

router.post('/login', userController.userLogin);

router.post('/bookSlot/:userId', userAuthentication, userAuthorization, bookingController.bookSlot);

router.get('/seeAvailableSlots', userAuthentication, bookingController.seeAvailableSlots);

router.post('/updateSlot/:userId', userAuthentication, userAuthorization, bookingController.updateSlot);


module.exports = router;