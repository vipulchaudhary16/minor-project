const mongoose = require('mongoose');

const ProjectRequest = new mongoose.Schema({
	from: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		message: {
			type: String,
		},
	},

	to: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		message: {
			type: String,
		},
	},

	status: {
		type: String,
		enum: ['pending', 'accepted', 'rejected'],
		default: 'pending',
	},
	
	groupId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group',
	},
	problemStatementId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'ProblemStatement',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('ProjectRequest', ProjectRequest);
