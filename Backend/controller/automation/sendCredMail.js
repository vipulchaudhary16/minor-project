const schedule = require('node-schedule');
const User = require('../../schema/User.schema');
const { sendCredentials } = require('../mail/mails.controller');

const scheduleCredentialMail = async () => {
    const nightSchedule = new schedule.RecurrenceRule();
    nightSchedule.hour = 0;
    nightSchedule.minute = 0;
    nightSchedule.second = 0;

    const runAtNight = async () => {
        console.log(".......Sending credentials to all users started....");
        const users = await User.find({});
        for (let user of users) {
            await sendCredentials(user.name, user.email, user.password);
            console.log(`Sent credentials to ${user.email}`);
        }
        console.log("........Sent credentials to all users.....");
    }

    schedule.scheduleJob(nightSchedule, runAtNight);
}

module.exports = { scheduleCredentialMail };