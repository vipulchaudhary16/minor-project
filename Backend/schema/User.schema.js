const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	rollNo: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: {
			validator: function (value) {
				const emailRegex = /^[a-zA-Z0-9._%+-]+@sot\.pdpu\.ac\.in$/;
				return emailRegex.test(value);
			},
			message: 'Email should be an organization email.',
		},
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: Number,
		required: true,
		enum: [0, 1, 2],
	},
	isVerified: {
		type: Boolean,
		default: true,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
