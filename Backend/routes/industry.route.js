const express = require('express');
const { addIndustryInternshipRequest, updateIndustryRequest, getIndustryRequests } = require('../controller/industry/IndustryInternshipRequest.controller');
const verifyToken = require('../middleware/token.middleware');
const { authorizeAdmin } = require('../middleware/authorize.middleware');
const router = express.Router();

router.post('/create', verifyToken, addIndustryInternshipRequest)
router.put('/update/:id', verifyToken, authorizeAdmin, updateIndustryRequest)
router.get('/', verifyToken, getIndustryRequests)

module.exports = router;