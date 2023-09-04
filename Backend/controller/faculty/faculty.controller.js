const ProblemStatement = require('../../schema/ProblemStatement.schema');
const { getGroupData } = require('../group/group.controller');

const getGroupsWorkingUnderFaculty = async (req, res) => {
	try {
		const userId = req.user.id;
		const selectedProblems = await ProblemStatement.find({
			facultyId: userId,
			selectedBy: { $ne: null },
		});
		const groups = selectedProblems.map((problem) => problem.selectedBy);
		const groupDataPromises = groups.map(async (group) => {
			return await getGroupData(group._id);
		});

		const response = await Promise.all(groupDataPromises);

		return res.status(200).json(response);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

module.exports = {
	getGroupsWorkingUnderFaculty,
};
