const ProblemStatement = require("../../schema/ProblemStatement.schema");
const CustomProjectRequestSchema = require("../../schema/Request/CustomProjectRequest.schema");

const addNewCustomProjectRequest = async (req, res) => {
    try {
        console.log(req.user);
        const from = req.user.groupId;
        const { projectTitle, projectDescription, projectDomain, to } = req.body;
        const newCustomProjectRequest = new CustomProjectRequestSchema({
            from,
            to,
            projectTitle,
            projectDescription,
            projectDomain,
        });
        await newCustomProjectRequest.save();
        res.send('Request sent successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal Server Error');
    }
};

const updateCustomProjectRequest = async (req, res) => {
    try {
        const { requestId, status, message } = req.body;
        const request = await CustomProjectRequestSchema.findByIdAndUpdate(requestId, {
            status, message
        }, { new: true });
        if (status === 'accepted') {
            await ProblemStatement.create({
                facultyId: request.to,
                title: request.projectTitle,
                statement: request.projectDescription,
                domain: request.projectDomain,
                selectedBy: request.from,
            });
        }
        res.send('Request updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).json('Internal Server Error');
    }
};

module.exports = {
    addNewCustomProjectRequest,
    updateCustomProjectRequest,
};