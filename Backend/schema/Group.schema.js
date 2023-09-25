const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
	groupNumber: {
		type: Number,
		required: true,
		Unique: true,
	},
	groupMembers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Group', groupSchema);
