const express = require('express');
const verifyToken = require('../middleware/token.middleware');
const {
	sendRequest,
	updateRequest,
	withdrawRequest,
} = require('../controller/project/projectRequest.controller');
const { getRequests } = require('../controller/project/request.controller');
const router = express.Router();

router.use(verifyToken);

router.post('/send', sendRequest);
router.get('/', getRequests);
router.put('/update/:requestId', updateRequest);
router.delete('/withdraw/:requestId', withdrawRequest);

module.exports = router;
