const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.MAIL,
		pass: process.env.MAIL_PASSWORD,
	},
});

const sendOTP = async (email, generatedOTP) => {
	const emailTemplate = fs.readFileSync("./views/mails/otp.html", "utf-8");
	console.log(emailTemplate);
	const mailOptions = {
		from: process.env.MAIL,
		to: email,
		subject: 'Verify your mail for Comprehensive Project Portal',
		// html: `<p>Your Verification code is : <strong>${generatedOTP}</strong></p>`,
		html: emailTemplate.replace("{{otp}}", generatedOTP),
	};
	return await transporter.sendMail(mailOptions);
};

const sendCredentials = async (email, name, password) => {
	const mailOptions = {
		from: process.env.MAIL,
		to: email,
		subject: 'Credentials for Comprehensive Project Portal',
		html: `<p>Hello ${name},</p><p>Your credentials for Comprehensive Project Portal are as follows:</p>
		<p><strong>Email: </strong>${email}</p>
		<p><strong>Password: </strong>${password}</p>`,
	};
	return await transporter.sendMail(mailOptions);
};

module.exports = { sendOTP, sendCredentials };
