const Request = require('../schema/Request.schema');

const sendRequest = async (req, res) => {
	try {
		const from = req.user.id;
		const { to, message, data } = req.body;
		const request = new Request({ from, to, message_by_from: message, data });
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

		const request = await Request.findById(requestId);

		if (!request) {
			return res.status(404).send('Request not found');
		}

		if (request.to.toString() !== user) {
			return res.status(403).send('Unauthorized to update the request');
		}

		await Request.findByIdAndUpdate(
			requestId,
			{ status, message_by_to: message },
			{ new: true }
		);

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

		const request = await Request.findById(requestId);

		if (!request) {
			return res.status(404).send('Request not found.');
		}

		if (request.from.toString() !== user) {
			return res.status(403).json('Unauthorized to withdraw the request.');
		}

		await Request.findByIdAndDelete(requestId);

		res.status(200).json('Request withdrawn successfully.');
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const getRequests = async (req, res) => {
	try {
		const user = req.user.id;
		const requests = await Request.find({
			$or: [{ from: user }, { to: user }],
		});
		res.status(200).json(requests);
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
