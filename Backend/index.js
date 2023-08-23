const express = require('express');
require('dotenv').config();
const cors = require('cors');
const logger = require('morgan');
const dbConfig = require('./config/db.config');
const ProblemStatement = require('./schema/ProblemStatement.schema');
const app = express();
require('use-strict');

app.use(cors());
app.use(express.json());

const predefinedFormat =
	':method :url :status :res[content-length] - :response-time ms';
app.use(logger(predefinedFormat));

dbConfig.connect();

app.get('/api', async (req, res) => {
	const problemStatementDetails = await ProblemStatement.find()
		.populate('facultyId', ['_id', 'name']) // Replace with the fields you want from the User model
		.populate('selectedBy', ['_id', 'groupNumber']) // Replace with the fields you want from the Group model
		.exec();
	return res.json(problemStatementDetails);
	res.send('API Ok!');
});

app.use('/api/user', require('./routes/user.route'));
app.use('/api/problemStatement', require('./routes/problemStatement.route'));
app.use('/api/project-request/', require('./routes/request.route'));
app.use('/api/group/', require('./routes/group.route'));

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
