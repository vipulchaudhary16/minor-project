const express = require('express');
const verifyToken = require('../middleware/token.middleware');
const {
	addNewProblemStatement,
	getProblemStatements,
	searchInProblemStatements,
	getAllDomains,
	updateProblemStatement,
} = require('../controller/project/problemStatement.controller');
const router = express.Router();

router.use(verifyToken);
router.post('/create', addNewProblemStatement);
router.put('/update', updateProblemStatement);
router.get('/', getProblemStatements);
router.get('/domains', getAllDomains);

module.exports = router;
