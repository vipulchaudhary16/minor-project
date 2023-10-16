const express = require('express');
const {
	getUserData,
	updateUser,
	getUsers,
} = require('../controller/user/user.controller');
const verifyToken = require('../middleware/token.middleware');
const { authorizeAdmin } = require('../middleware/authorize.middleware');
const { registerUsers, logIn } = require('../controller/user/auth.controller');
const router = express.Router();

router.post('/register', verifyToken, authorizeAdmin, registerUsers);
router.post('/login', logIn);
router.put("/", verifyToken, updateUser);
router.get('/', getUserData);

router.get('/users', getUsers)

module.exports = router;
