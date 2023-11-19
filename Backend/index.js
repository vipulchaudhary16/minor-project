const express = require("express");
require("dotenv").config();
const cors = require("cors");
const logger = require("morgan");
const dbConfig = require("./config/db.config");
require("./config/cloudinary.config");
require("./controller/automation/automation")
const fileUpload = require("express-fileupload");
const { sendCredentials } = require("./controller/mail/mails.controller");
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({
	useTempFiles: true
}))

const predefinedFormat =
	":method :url :status :res[content-length] - :response-time ms";
app.use(logger(predefinedFormat));

dbConfig.connect();

app.get("/api", async (req, res) => {
	await sendCredentials(
		"Vipul Rana",
		"vipulr6111@gmail.com",
		"123456789"
	).then((data) => {
		return res.json(data);
	});
});

app.use("/api/user", require("./routes/user.route"));
app.use("/api/problemStatement", require("./routes/problemStatement.route"));
app.use("/api/project-request/", require("./routes/request.route"));
app.use("/api/group/", require("./routes/group.route"));
app.use("/api/constraints/", require("./routes/constraints.route"));
app.use("/api/industry/", require("./routes/industry.route"));

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
