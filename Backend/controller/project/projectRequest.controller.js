const ProjectRequestSchema = require('../../schema/Request/ProjectRequest.schema');

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

module.exports = {
	sendRequest,
	updateRequest,
	withdrawRequest,
};
