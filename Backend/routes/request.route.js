const express = require('express');
const verifyToken = require('../middleware/token.middleware');
const {
	sendRequest,
	updateRequest,
	withdrawRequest,
	getRequests,
} = require('../controller/request.controller');
const router = express.Router();

router.use(verifyToken);

router.get('/', getRequests)
router.post('/send', sendRequest);
router.put('/update/:requestId', updateRequest);
router.delete('/withdraw/:requestId', withdrawRequest);

module.exports = router;
