const mongoose = require('mongoose');

const InvitationRequest = new mongoose.Schema({
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

	type:{
		type: String,
		default: "GROUP_INVITE"
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

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('InvitationRequest', InvitationRequest);
