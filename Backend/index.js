const express = require('express');
require('dotenv').config();
const cors = require('cors');
const logger = require('morgan');
const dbConfig = require('./config/db.config');
const app = express();

app.use(cors());
app.use(express.json());

const predefinedFormat = ':method :url :status :res[content-length] - :response-time ms';
app.use(logger(predefinedFormat));

dbConfig.connect();

app.get('/api', (req, res) => {
	res.send('API Ok!');
});

app.use('/api/user', require('./routes/user.route'));
app.use('/api/problemStatement', require('./routes/problemStatement.route'));
app.use('/api/request/', require('./routes/request.route'))

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
