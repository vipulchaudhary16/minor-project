const OTP = require('../../schema/OTP.schema');
const User = require('../../schema/User.schema');
const jwt = require('jsonwebtoken');
const { generateRandomPassword } = require('../utils/function.controller');
const { getUserGroup } = require('./user.controller');
const SECRET = process.env.JWT_SECRET_KEY;

const registerUsers = async (req, res) => {
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
		const group = await getUserGroup(user._id);

		const payload = {
			user: {
				id: user._id,
				role: user.role,
				choice: user.choice,
				groupId: group._id ?? null,
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
				choice: user.choice,
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
	} catch (error) {
		console.log(error);
		res.status(500).send(error.message);
	}
};

module.exports = {
	register,
	verifyOTP,
	logIn,
	registerUsers,
};