const express = require('express');
const {
	register,
	verifyOTP,
	logIn,
	registerInBulkAndSendCredentials,
	getUserData,
} = require('../controller/user.controller');
const verifyToken = require('../middleware/token.middleware');
const {
	getGroupsWorkingUnderFaculty,
} = require('../controller/faculty/faculty.controller');
const {
	updateConstraints,
	getConstraints,
} = require('../controller/constraints.controller');
const router = express.Router();

// router.post('/register', register);
router.get('/:id', getUserData);
router.post('/register', registerInBulkAndSendCredentials);
router.post('/verify-email', verifyOTP);
router.post('/login', logIn);

/* Faculty routes */
router.get('/faculty/get-groups', verifyToken, getGroupsWorkingUnderFaculty);

/* Admin routes */
//TODO : add admin middleware
router.get('/admin/get-constraints', verifyToken, getConstraints);
router.post('/admin/update-constraints', verifyToken, updateConstraints);

module.exports = router;
