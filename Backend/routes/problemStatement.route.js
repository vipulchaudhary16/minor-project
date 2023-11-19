const express = require('express');
const verifyToken = require('../middleware/token.middleware');
const {
	addNewProblemStatement,
	getProblemStatements,
	searchInProblemStatements,
	getAllDomains,
	updateProblemStatement,
} = require('../controller/project/problemStatement.controller');
const { addNewCustomProjectRequest, updateCustomProjectRequest } = require('../controller/project/customProjectRequest.controller');
const router = express.Router();

router.use(verifyToken);
router.post('/create', addNewProblemStatement);
router.put('/update', updateProblemStatement);
router.get('/', getProblemStatements);
router.get('/domains', getAllDomains);
router.post("/custom/create", verifyToken, addNewCustomProjectRequest);
router.put("/custom/update", verifyToken, updateCustomProjectRequest);


module.exports = router;
