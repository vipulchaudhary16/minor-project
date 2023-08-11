const mongoose = require('mongoose');
const ProjectRequestSchema = require('../../schema/Request/ProjectRequest.schema');
const GroupSchema = require('../../schema/Group.schema');

/**
 * Send a request to faculty to select a problem statement
 * type: POST
 * body: {
	 	to : Id of the faculty to whom the request is sent
		message : Message to the faculty
		groupId : Id of the group
		problemStatementId : Id of the problem statement	
	}
 */
const sendRequest = async (req, res) => {
	try {
		const { to, message, groupId, problemStatementId } = req.body;
		const from = req.user.id;

		const request = await ProjectRequestSchema({
			from: {
				id: from,
				message: message,
			},
			to: {
				id: to,
			},
			groupId: groupId,
			problemStatementId,
		});

		await request.save();

		res.status(201).json('Request sent');
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const updateRequest = async (req, res) => {
	try {
		const { requestId } = req.params;
		const { status, message } = req.body;
		const user = req.user.id;

		const request = await ProjectRequestSchema.findOne({
			_id: requestId,
		});

		if (!request) {
			return res.status(404).send('Request not found');
		}

		if (request.to.id.toString() !== user) {
			return res.status(403).send('Unauthorized to update the request');
		}

		await ProjectRequestSchema.findByIdAndUpdate(requestId, {
			status,
			to: {
				message,
			},
		});

		res.status(200).json('Request updated');
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const withdrawRequest = async (req, res) => {
	try {
		const { requestId } = req.params;
		const user = req.user.id;

		const request = await ProjectRequestSchema.findById(requestId);

		if (!request) {
			return res.status(404).send('Request not found.');
		}

		if (request.from.id.toString() !== user) {
			return res.status(403).json('Unauthorized to withdraw the request.');
		}

		await ProjectRequestSchema.findByIdAndDelete(requestId);

		res.status(200).json('Request withdrawn successfully.');
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const getRequests = async (req, res) => {
	try {
		const user = new mongoose.Types.ObjectId(req.user.id);
		const pipeline = [];
		if (req.user.role === 2) {
			const userGroup = await GroupSchema.findOne({
				groupMembers: { $in: [user] },
			});
			pipeline.push({
				$match: {
					groupId: userGroup._id,
				},
			});
		} else {
			pipeline.push({
				$match: {
					'to.id': user,
				},
			});
		}
		pipeline.push(
			...[
				{
					$lookup: {
						from: 'users',
						localField: 'from.id',
						foreignField: '_id',
						as: 'fromUser',
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
					$lookup: {
						from: 'groups',
						localField: 'groupId',
						foreignField: '_id',
						as: 'group',
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
					$unwind: '$fromUser',
				},
				{
					$unwind: '$toUser',
				},
				{
					$unwind: '$group',
				},
				{
					$unwind: '$problemStatement',
				},
				{
					$project: {
						_id: 1,
						fromUser: {
							_id: 1,
							name: 1,
						},
						toUser: {
							_id: 1,
							name: 1,
						},
						status: 1,
						group: {
							_id: 1,
							groupNumber: 1,
						},
						problemStatement: {
							_id: 1,
							statement: 1,
						},
						createdAt: 1,
					},
				},
			]
		);

		const requests = await ProjectRequestSchema.aggregate(pipeline);

		return res.json(requests);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

module.exports = {
	sendRequest,
	updateRequest,
	withdrawRequest,
	getRequests,
};
