const express = require('express');
const {
	register,
	verifyOTP,
	logIn,
	registerInBulkAndSendCredentials,
	getUserData,
} = require('../controller/user/user.controller');
const verifyToken = require('../middleware/token.middleware');
const {
	updateConstraints,
	getConstraints,
} = require('../controller/constraints/constraints.controller');
const router = express.Router();

// router.post('/register', register);
router.get('/:id', getUserData);
router.post('/register', registerInBulkAndSendCredentials);
router.post('/verify-email', verifyOTP);
router.post('/login', logIn);

/* Admin routes */
//TODO : add admin middleware
router.get('/admin/get-constraints', verifyToken, getConstraints);
router.post('/admin/update-constraints', verifyToken, updateConstraints);

module.exports = router;
