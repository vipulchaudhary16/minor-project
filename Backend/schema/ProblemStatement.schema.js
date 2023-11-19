const mongoose = require('mongoose');

const problemStatementSchema = new mongoose.Schema({
	facultyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User', // Reference to the User model for Faculty
		required: true,
	},
	//TODO: add this field on frontend and other places where problem statement is used
	title: {
		type: String,
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
	selectedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Group', // Reference to the Group model for Group
	},
});

const ProblemStatement = mongoose.model(
	'ProblemStatement',
	problemStatementSchema
);

module.exports = ProblemStatement;
