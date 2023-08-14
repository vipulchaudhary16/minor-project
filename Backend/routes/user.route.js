const express = require('express');
const {
	register,
	verifyOTP,
	logIn,
	registerInBulkAndSendCredentials,
	getUserData,
} = require('../controller/user.controller');
const verifyToken = require('../middleware/token.middleware');
const router = express.Router();

// router.post('/register', register);
router.get('/:id', getUserData);
router.post('/register', registerInBulkAndSendCredentials);
router.post('/verify-email', verifyOTP);
router.post('/login', logIn);

module.exports = router;
