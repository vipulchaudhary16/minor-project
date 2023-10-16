const GroupSchema = require('../../schema/Group.schema');
const GroupInvitationRequestSchema = require('../../schema/Request/GroupInvitationRequest.schema');

/**
 * Send invite request for joining a group
 * @param {*} fromId : id of the user who is sending the request
 * @param {*} groupId : id of the group
 * @param {[Array]} memberIds : ids of the users to whom the request is sent, make sure that the user is not already in a group
 */
const sendInviteRequest = async (fromId, groupId, memberIds) => {
	memberIds.forEach(async (memberId) => {
		if (!(await GroupSchema.findOne({ groupMembers: { $in: [memberId] } }))) {
			const request = new GroupInvitationRequestSchema({
				from: {
					id: fromId,
					message: 'You are requested to join this group',
				},
				to: {
					id: memberId,
				},
				groupId,
			});
			await request.save();
		} else {
			//TODO: send notification to the user that he is already in a group
		}
	});
};

/**
 * Invite a members to join a group, (server function)
 * @type: POST
 * @body
	- groupId : String == id of the group
	- memberIds : [] == ids of the members to whom the request is sent
 */
const inviteMember = async (req, res) => {
	try {
		const { groupId, memberIds } = req.body;
		const userId = req.user.id;

		// check if the user is already in a group.
		if (memberIds.includes(userId)) {
			return res.status(400).send('You can not invite your self');
		}
		// send invite request to all the members
		await sendInviteRequest(userId, groupId, memberIds);
		res.status(201).json('Request sent');
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

/**
 * Accept a group invitation (server function)
 * @type: POST
 * @params
		- invitationId : String == id of the invitation
 */
const updateGroupInvitation = async (req, res) => {
	try {
		const { invitationId } = req.query;
		console.log(invitationId);
		const { status } = req.query;
		const userId = req.user.id;

		const invitation = await GroupInvitationRequestSchema.findById(
			invitationId
		);
		// check if the invitation is valid
		if (!invitation) {
			return res.status(400).send('Invalid invitation id');
		}
		// check if the invitation is already accepted
		if (invitation.status === 'accepted') {
			return res.status(400).send('You have already accepted this invitation');
		}
		// check if user is authorized to accept this invitation
		if (invitation.to.id.toString() !== userId) {
			return res
				.status(400)
				.send('You are not authorized to accept this invitation');
		}
		if (status === 'rejected') {
			await updateInvitationStatus(invitationId, 'rejected');
			return res.status(200).send('Invitation rejected');
		} else if (status === 'accepted') {
			// check if the user is already in a group
			const group = await GroupSchema.findOne({
				groupMembers: { $in: [userId] },
			})
			if (group) {
				return res.status(400).send('You are already in a group');
			}
			// update the invitation status to accepted
			await updateInvitationStatus(invitationId, 'accepted');
			// add the user to the group
			await GroupSchema.findByIdAndUpdate(invitation.groupId, {
				$push: { groupMembers: userId },
			});
			res.status(200).send('Invitation accepted');
		}

		res.status(400).send('Invalid status');
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

/**
 * Update the invitation status
 * @param {*} id : id of the invitation
 * @param {*} status : status of the invitation (accepted, rejected)
 */
const updateInvitationStatus = async (id, status) => {
	await GroupInvitationRequestSchema.findByIdAndUpdate(id, {
		status,
	});
};

module.exports = {
	sendInviteRequest,
	inviteMember,
	updateGroupInvitation,
};
