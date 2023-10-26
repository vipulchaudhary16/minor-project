const GroupInvitationRequestSchema = require('../../schema/Request/GroupInvitationRequest.schema');
const mongoose = require('mongoose');
const ProjectRequestSchema = require('../../schema/Request/ProjectRequest.schema');
const GroupSchema = require('../../schema/Group.schema');
const { getProjectObj, getUserLookUp } = require('../utils/pipeline.utils');

const projectRequestLookups = [
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
]

const getRequests = async (req, res) => {
	try {
		const userId = new mongoose.Types.ObjectId(req.user.id);
		const { type } = req.query;
		const group = await GroupSchema.findOne({
			groupMembers: { $in: [userId] },
		});

		if (type === 'sent') {
			const groupRequestPipeline = [
				{ $match: { 'from.id': userId } },
				...getUserLookUp('to.id'),
				{
					$project: getProjectObj('group', 'sent')
				},
			]
			const groupRequests = await GroupInvitationRequestSchema.aggregate(
				groupRequestPipeline
			);

			let projectRequests = [];
			if (group) {
				const projectPipeline = [
					{
						$match: {
							groupId: group._id,
						},
					},
					...getUserLookUp('to.id'),
					...projectRequestLookups,
					{
						$project: getProjectObj('project', 'sent')
					}
				];
				projectRequests = await ProjectRequestSchema.aggregate(projectPipeline);
			}
			return res.json([
				...groupRequests,
				...projectRequests,
			]);
		} else if (type === 'received') {
			const groupPipeline = [
				{ $match: { 'to.id': userId } },
				...getUserLookUp('from.id'),
				{
					$project: getProjectObj('group', 'received')
				},
			];
			const groupRequests = await GroupInvitationRequestSchema.aggregate(
				groupPipeline
			);
			const projectPipeline = [
				{
					$match: {
						'to.id': userId
					},
				},
				...getUserLookUp('from.id'),
				...projectRequestLookups,
				{
					$project: getProjectObj('project', 'received')
				},
			];
			const projectRequests = await ProjectRequestSchema.aggregate(
				projectPipeline
			);
			return res.json([
				...groupRequests,
				...projectRequests,
			]);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

module.exports = {
	getRequests,
};
