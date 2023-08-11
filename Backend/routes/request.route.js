const express = require('express');
const verifyToken = require('../middleware/token.middleware');
const { getRequests, sendRequest, updateRequest, withdrawRequest } = require('../controller/request/projectRequest.controller');
const router = express.Router();

router.use(verifyToken);

router.get('/', getRequests)
router.post('/send', sendRequest);
router.put('/update/:requestId', updateRequest);
router.delete('/withdraw/:requestId', withdrawRequest);

module.exports = router;
