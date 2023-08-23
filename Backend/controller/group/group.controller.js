const GroupSchema = require('../../schema/Group.schema');
const mongoose = require('mongoose');
const User = require('../../schema/User.schema');
const { sendInviteRequest } = require('./invitation.controller');

/**
 * Create a new group (server function)
 * type: POST
 * body: {
		members : [] == ids of the members to whom the request is sent
	}
 */
const create = async (req, res) => {
	//start session and transaction
	const session = await mongoose.startSession();
	session.startTransaction();

	try {
		const userId = req.user.id;
		// check if user is already in a group
		const { members } = req.body;

		if (await GroupSchema.findOne({ groupMembers: { $in: [userId] } })) {
			return res.status(400).send('You are already in a group');
		}

		// get the highest group number and increment it by 1
		const highestGroup = await GroupSchema.findOne()
			.sort({ groupNumber: -1 })
			.limit(1)
			.session(session);

		const groupNumber = highestGroup ? highestGroup.groupNumber + 1 : 1;

		// create a new group
		const group = new GroupSchema({
			groupNumber: groupNumber,
			createdBy: userId,
			groupMembers: [userId],
		});

		await group.save({ session });
		// send invite request to all the members
		await sendInviteRequest(userId, group._id, members);
		// commit the transaction
		await session.commitTransaction();
		res.status(200).json(group);
	} catch (error) {
		// abort the transaction
		console.log(error);
		await session.abortTransaction();
		res.status(500).send('Internal server error');
	} finally {
		session.endSession();
	}
};

/**
 * Get all the groups (server function)
 * type: GET
 */
const getUnGroupedUsers = async (req, res) => {
	try {
		const pipeline = [
			{
				$match: {
					role: 2, // Filter only students
				},
			},
			{
				$lookup: {
					from: 'groups',
					localField: '_id',
					foreignField: 'groupMembers',
					as: 'memberOfGroups',
				},
			},
			{
				$match: {
					memberOfGroups: { $size: 0 }, // Filter users not part of any group
				},
			},
			{
				$project: {
					// Filter only required fields from user
					id: '$_id',
					// name: 1,
					rollNo: 1,
					_id: 0,
				},
			},
		];
		const users = await User.aggregate(pipeline);
		//sort by roll no, roll no is string
		// users.sort((a, b) => {
		// 	return a.rollNo.localeCompare(b.rollNo);
		// });
		res.status(200).json(users);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

module.exports = {
	create,
	getUnGroupedUsers,
};
