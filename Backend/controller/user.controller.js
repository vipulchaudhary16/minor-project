const OTP = require('../schema/OTP.schema');
const User = require('../schema/User.schema');
const { generateOTP } = require('./function.controller');
const { sendOTP, sendCredentials } = require('./mails.controller');
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
		for (let i = 0; i < users.length; i++) {
			const { name, email, rollNo } = users[i];
			const newUser = new User({
				name,
				email,
				rollNo,
				role: 2,
				password: generateRandomPassword(name),
			});
			await newUser.save();
			await sendCredentials(email, name, newUser.password).then(() => {
				console.log(`Credentials sent to ${email}`);
			});
		}
		res.status(200).send('Users registered successfully');
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
		res.status(200).json({ token });
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
};
