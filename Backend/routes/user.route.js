const express = require('express');
const { register, verifyOTP, logIn, registerInBulkAndSendCredentials } = require('../controller/user.controller');
const router = express.Router();

// router.post('/register', register);
router.post('/register', registerInBulkAndSendCredentials);
router.post('/verify-email', verifyOTP);
router.post('/login', logIn)

module.exports = router;
