const GroupSchema = require('../../schema/Group.schema');
const OTP = require('../../schema/OTP.schema');
const User = require('../../schema/User.schema');
const { getGroupData } = require('../group/group.controller');
const { sendOTP, sendCredentials } = require('../mail/mails.controller');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET_KEY;

const register = async (req, res) => {
	try {
		const { name, email, password, rollNo, role } = req.body;

		if (role != 2) {
			//TODO: handle non student registration for API level security
			return res.status(400).send('Only students can register');
		}

		// Check if user already exists with same email and is verified
		const user = await User.findOne({ email });
		if (user && user.isVerified) {
			return res.status(400).send('User email already exists');
		} else if (user && !user.isVerified) {
			//delete it if user is not verified and register again
			await User.deleteOne({ email });
		}

		//TODO: hash password before saving to database
		const newUser = new User({
			name,
			email,
			password,
			rollNo,
			role,
		});

		// create new user if user doesn't exist
		await newUser.save();
		const generatedOTP = generateOTP();

		await sendOTP(email, generatedOTP);
		const otpDoc = new OTP({
			otp: generatedOTP,
		});

		await otpDoc.save();
		res.status(200).json({ txnId: otpDoc._id });
	} catch (error) {
		console.log(error);
		res.status(500).send(error.message);
	}
};

const generateRandomPassword = (name) => {
	const randomPassword = Math.random().toString(36).slice(-8);
	return `${name.split(' ')[0]}${randomPassword}`;
};

const registerInBulkAndSendCredentials = async (req, res) => {
	try {
		const { users } = req.body;
		const response = [];
		for (let i = 0; i < users.length; i++) {
			const { name, email, rollNo, role } = users[i];
			const isAlreadyRegistered = await User.findOne({ email });
			if (isAlreadyRegistered) {
				response.push({
					email,
					status: 'Already registered'
				})
				continue;
			}
			const newUser = new User({
				name,
				email,
				rollNo,
				role,
				password: generateRandomPassword(name),
			});
			await newUser.save();
			response.push({
				email,
				status: 'Registered successfully'
			})
			await sendCredentials(email, name, newUser.password).then(() => {
				console.log(`Credentials sent to ${email}`);
			});
		}
		res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const logIn = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user || !user.isVerified) {
			return res.status(400).send('User not found');
		}
		if (user.password !== password) {
			return res.status(400).send('Invalid password');
		}
		const payload = {
			user: {
				id: user._id,
				role: user.role,
			},
		};
		const token = jwt.sign(payload, SECRET);

		res.status(200).json({
			token,
			user: {
				id: user._id,
				email: user.email,
				name: user.name,
				rollNo: user.rollNo,
				role: user.role,
				group: await getUserGroup(user._id),
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const getUserData = async (req, res) => {
	try {
		const { id } = req.params;
		const user = await User.findById(id);
		console.log(user);
		if (!user) {
			return res.status(400).send('User not found');
		}
		let group = await getUserGroup(id);
		res.status(200).json({
			user: {
				id: user._id,
				email: user.email,
				name: user.name,
				rollNo: user.rollNo,
				role: user.role,
				group,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const verifyOTP = async (req, res) => {
	try {
		const { txnId, otp } = req.body;
		const otpDoc = await OTP.findById(txnId);
		if (!otpDoc) {
			return res.status(400).send('Invalid txnId');
		}
		if (otpDoc.otp !== otp) {
			return res.status(400).send('Invalid OTP');
		}
		await User.findOneAndUpdate({ isVerified: true });
		await otpDoc.deleteOne();
		res.status(200).send('User verified successfully');
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

module.exports = {
	register,
	verifyOTP,
	logIn,
	registerInBulkAndSendCredentials,
	getUserData,
};

async function getUserGroup(id) {
	const groupData = await GroupSchema.findOne({
		groupMembers: { $in: [id] },
	});
	let group = [];
	if (groupData) group = await getGroupData(groupData._id);
	return group;
}
