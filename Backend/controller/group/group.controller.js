const GroupSchema = require('../../schema/Group.schema');
const mongoose = require('mongoose');
const User = require('../../schema/User.schema');
const { sendInviteRequest } = require('./invitation.controller');
const ProblemStatement = require('../../schema/ProblemStatement.schema');

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
		const { members } = req.body;
		
		// check if user is already in a group
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

const getGroupData = async (groupId) => {
	const pipeline = [
		{
			$match: {
				_id: groupId,
			},
		},
		{
			$lookup: {
				from: 'users',
				localField: 'groupMembers',
				foreignField: '_id',
				as: 'groupMembersData',
			},
		},
		{
			$lookup: {
				from: 'users',
				localField: 'createdBy',
				foreignField: '_id',
				as: 'createdByData',
			},
		},
		{
			$unwind: '$createdByData',
		},
		{
			$project: {
				groupNumber: 1,
				createdAt: 1,
				groupMembersData: {
					_id: 1,
					name: 1,
					rollNo: 1,
				},
				createdByData: {
					name: 1,
					rollNo: 1,
				},
			},
		},
	];
	const group = await GroupSchema.aggregate(pipeline);
	if (group[0]) {
		const groupId = group[0]._id;
		const problemStatement = await ProblemStatement.findOne({
			selectedBy: groupId,
		}, {
			statement: 1,
			_id: 1,
		});
		group[0].selectedProblemStatement = problemStatement;
	}
	return group[0] ?? null;
};

const getGroupsWorkingUnderFaculty = async (req, res) => {
	try {
		const userId = req.user.id;
		const selectedProblems = await ProblemStatement.find({
			facultyId: userId,
			selectedBy: { $ne: null },
		});
		const groups = selectedProblems.map((problem) => problem.selectedBy);
		const groupDataPromises = groups.map(async (group) => {
			return await getGroupData(group._id);
		});

		const response = await Promise.all(groupDataPromises);

		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

module.exports = {
	create,
	getUnGroupedUsers,
	getGroupData,
	getGroupsWorkingUnderFaculty
};
