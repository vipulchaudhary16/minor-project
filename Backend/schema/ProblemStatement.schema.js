const mongoose = require('mongoose');

const problemStatementSchema = new mongoose.Schema({
	facultyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User', // Reference to the User model for Faculty
		required: true,
	},
	statement: {
		type: String,
		required: true,
	},
	domain: {
		type: String,
		required: true,
	},
});

const ProblemStatement = mongoose.model(
	'ProblemStatement',
	problemStatementSchema
);

module.exports = ProblemStatement;
