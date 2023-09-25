const express = require('express');
const verifyToken = require('../middleware/token.middleware');
const {
    updateConstraints,
    getConstraints,
} = require('../controller/constraints/constraints.controller');

const { authorizeAdmin } = require('../middleware/authorize.middleware');
const router = express.Router();

router.use(verifyToken)
router.use(authorizeAdmin)
router.get('/get-constraints', getConstraints);
router.post('/update-constraints', updateConstraints);

module.exports = router;
