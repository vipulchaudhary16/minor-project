const express = require('express');
const verifyToken = require('../middleware/token.middleware');
const {
	create,
	getUnGroupedUsers,
} = require('../controller/group/group.controller');
const {
	acceptGroupInvitation,
	inviteMember,
} = require('../controller/group/invitation.controller');
const router = express.Router();

router.use(verifyToken);
router.post('/create', create);
router.post('/invite', inviteMember);
router.post('/accept-invitation/:invitationId', acceptGroupInvitation);
router.get('/get-ungrouped-users', getUnGroupedUsers);

module.exports = router;
