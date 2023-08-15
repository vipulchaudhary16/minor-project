const GroupInvitationRequestSchema = require('../schema/Request/GroupInvitationRequest.schema');
const mongoose = require('mongoose');
const ProjectRequestSchema = require('../schema/Request/ProjectRequest.schema');
const GroupSchema = require('../schema/Group.schema');

const getRequests = async (req, res) => {
	try {
		const userId = new mongoose.Types.ObjectId(req.user.id);
		const { type } = req.query;
		const group = await GroupSchema.findOne({
			groupMembers: { $in: [userId] },
		});

		if (type === 'sent') {
			const groupPipeline = [];
			groupPipeline.push(
				...[
					{ $match: { 'from.id': userId } },
					{
						$lookup: {
							from: 'users',
							localField: 'to.id',
							foreignField: '_id',
							as: 'toUser',
						},
					},
					{
						$unwind: {
							path: '$toUser',
							preserveNullAndEmptyArrays: true,
						},
					},
					{
						$project: {
							id: '$_id',
							_id: 0,
							user: {
								id: '$toUser._id',
								message: '$from.message',
								name: '$toUser.name',
							},
							type: 1,
							status: 1,
							groupId: 1,
							createdAt: 1,
						},
					},
				]
			);
			const groupRequests = await GroupInvitationRequestSchema.aggregate(
				groupPipeline
			);

			let projectRequests = [];
			if (group) {
				const projectPipeline = [
					{
						$match: {
							groupId: group._id,
						},
					},
					{
						$lookup: {
							from: 'users',
							localField: 'to.id',
							foreignField: '_id',
							as: 'toUser',
						},
					},
					{
						$unwind: {
							path: '$toUser',
							preserveNullAndEmptyArrays: true,
						},
					},
					{
						$lookup: {
							from: 'problemstatements',
							localField: 'problemStatementId',
							foreignField: '_id',
							as: 'problemStatement',
						},
					},
					{
						$unwind: {
							path: '$problemStatement',
							preserveNullAndEmptyArrays: true,
						},
					},
					{
						$lookup: {
							from: 'groups',
							localField: 'groupId',
							foreignField: '_id',
							as: 'group',
						},
					},
					{
						$unwind: {
							path: '$group',
							preserveNullAndEmptyArrays: true,
						},
					},
					{
						$project: {
							id: '$_id',
							_id: 0,
							user: {
								id: '$toUser._id',
								message: '$to.message',
								name: '$toUser.name',
							},
							message_by_sender: '$from.message',
							status: 1,
							groupDetails: {
								id: '$group._id',
								groupNo: '$group.groupNumber',
							},
							problemStatementDetails: {
								id: '$problemStatement._id',
								statement: '$problemStatement.statement',
							},
							type: 1,
							createdAt: 1,
						},
					},
				];
				projectRequests = await ProjectRequestSchema.aggregate(projectPipeline);
			}
			console.log(projectRequests);
			return res.json({
				groupRequests,
				projectRequests,
			});
		} else if (type === 'received') {
			const groupPipeline = [
				{ $match: { 'to.id': userId } },
				{
					$lookup: {
						from: 'users',
						localField: 'from.id',
						foreignField: '_id',
						as: 'fromUser',
					},
				},
				{
					$unwind: {
						path: '$fromUser',
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$project: {
						id: '$_id',
						_id: 0,
						user: {
							id: '$fromUser._id',
							message: '$from.message',
							name: '$fromUser.name',
						},
						status: 1,
						groupId: 1,
						createdAt: 1,
						type: 1,
					},
				},
			];
			const groupRequests = await GroupInvitationRequestSchema.aggregate(
				groupPipeline
			);
			const projectPipeline = [
				{
					$match: {
						$or: [{ 'to.id': userId }],
					},
				},
				{
					$lookup: {
						from: 'users',
						localField: 'from.id',
						foreignField: '_id',
						as: 'fromUser',
					},
				},
				{
					$unwind: {
						path: '$toUser',
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$lookup: {
						from: 'problemstatements',
						localField: 'problemStatementId',
						foreignField: '_id',
						as: 'problemStatement',
					},
				},
				{
					$unwind: {
						path: '$problemStatement',
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$lookup: {
						from: 'groups',
						localField: 'groupId',
						foreignField: '_id',
						as: 'group',
					},
				},
				{
					$unwind: {
						path: '$group',
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$project: {
						id: '$_id',
						_id: 0,
						user: {
							id: '$fromUser._id',
							message: '$fromUser.message',
							name: '$fromUser.name',
						},
						message_by_sender: '$from.message',
						status: 1,
						groupDetails: {
							id: '$group._id',
							groupNo: '$group.groupNumber',
						},
						problemStatementDetails: {
							id: '$problemStatement._id',
							statement: '$problemStatement.statement',
						},
						createdAt: 1,
						type: 1,
					},
				},
			];
			const projectRequests = await ProjectRequestSchema.aggregate(
				projectPipeline
			);
			return res.json({
				groupRequests,
				projectRequests,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

module.exports = {
	getRequests,
};
