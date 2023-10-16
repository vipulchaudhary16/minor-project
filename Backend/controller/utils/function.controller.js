const generateOTP = () => {
	const digits = '0123456789';
	let otp = '';
	for (let i = 0; i < 6; i++) {
		otp += digits[Math.floor(Math.random() * 10)];
	}
	return otp;
};

const generateRandomPassword = (name) => {
	const randomPassword = Math.random().toString(36).slice(-8);
	return `${name.split(' ')[0]}${randomPassword}`;
};

module.exports = {
	generateOTP,
	generateRandomPassword
};