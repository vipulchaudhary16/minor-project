const mongoose = require('mongoose');

const IndustryInternshipRequestSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	role: {
		type: String,
		required: true
	},
	companyDetails: {
		type: {
			companyName: {
				type: String,
				required: true
			},
			companyAddress: {
				type: {
					city: {
						type: String,
						required: true
					},
					pincode: {
						type: String,
						required: true
					},
					state: {
						type: String,
						required: true
					},
					country: {
						type: String,
						required: true
					},
					googleMapLink: {
						type: String,
					},
				},
				required: true
			},
			companyWebsite: {
				type: String,
			},
		}
	},
	stipend: {
		type: Number
	},
	joiningDate: {
		type: Date,
		required: true
	},
	endingDate: {
		type: Date,
		required: true
	},
	offerLetter: {
		type: String,
		required: true
	},
	status: {
		type: String,
		enum: ['pending', 'accepted', 'rejected'],
		default: 'pending',
	},
	update: {
		type: {
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
			message: {
				type: String,
			}
		}
	}
}, {
	timestamps: true
});

const IndustryInternshipRequest = mongoose.model('IndustryInternshipRequest', IndustryInternshipRequestSchema);
module.exports = IndustryInternshipRequest;
