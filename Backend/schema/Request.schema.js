const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
	from: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	to: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	message_by_to: {
		type: String,
	},
	message_by_from: {
		type: String,
	},
	status: {
		type: String,
		enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
		default: 'PENDING',
	},
	problemId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ProblemStatement',
	},
});

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
