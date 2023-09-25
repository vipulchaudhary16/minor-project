const express = require('express');
const {
	verifyOTP,
	logIn,
	registerInBulkAndSendCredentials,
	getUserData,
} = require('../controller/user/user.controller');
const verifyToken = require('../middleware/token.middleware');
const { authorizeAdmin } = require('../middleware/authorize.middleware');
const router = express.Router();

router.get('/:id', getUserData);
router.post('/register', verifyToken, authorizeAdmin, registerInBulkAndSendCredentials);
router.post('/verify-email', verifyOTP);
router.post('/login', logIn);

module.exports = router;
