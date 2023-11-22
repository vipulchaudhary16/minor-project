const GroupSchema = require('../../schema/Group.schema');
const ProblemStatement = require('../../schema/ProblemStatement.schema');
const User = require('../../schema/User.schema');
const { getGroupData } = require('../group/group.controller');

const getUserData = async (req, res) => {
	try {
		const { id, type } = req.query;
		if (type) {
			const users = await User.find({ role: type }, {
				_id: 1,
				name: 1
			});
			return res.status(200).json(users);
		}

		const user = await User.findById(id);
		if (!user) {
			return res.status(400).send('User not found');
		}

		let group = await getUserGroup(id);
		res.status(200).json({
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

const updateUser = async (req, res) => {
	try {
		const { id } = req.user;
		const { choice } = req.body;
		if (choice && choice != 'IND' && choice != 'INH') {
			return res.status(400).send('Invalid choice');
		}
		// !TODO: don't send password in response
		const udpatedUser = await User.findByIdAndUpdate(id, req.body.newData, {
			new: true,
		});
		res.status(201).json(udpatedUser);
	} catch (err) {
		console.error(err);
		res.status(500).json('Internal Server Error');
	}
};

const getUsers = async (req, res) => {
	try {
		const { type } = req.query;

		if (!type) {
			return res.status(400).send('Invalid request');
		}

		let usersQuery = {
			role: type,
		};
		let projection = {
			_id: 1,
			name: 1,
			email: 1,
		};

		if (type == 2) {
			projection.rollNo = 1;
		}

		const users = await User.find(usersQuery, projection).sort({ rollNo: 1, name: 1 })
		let response = users;

		// Student
		if (type == 2) {
			// Get all the groups in which the students are present
			const groupData = await GroupSchema.find({
				groupMembers: { $in: users.map(user => user._id) },
			}, {
				_id: 1,
				groupNumber: 1,
				groupMembers: 1,
			});

			let groups = {};
			// Map the groups by user id
			groupData.forEach(group => {
				group.groupMembers.forEach(memberId => {
					const user = users.find(user => user._id.equals(memberId));
					if (user) {
						groups[user._id] = {
							_id: group._id,
							groupNumber: group.groupNumber,
						};
					}
				});
			});

			// Update the response
			response = users.map(user => {
				return {
					...user._doc,
					group: groups[user._id],
				};
			});
		}

		// Faculty
		else if (type == 1) {
			// Get all the problem statements
			const problemStatements = await ProblemStatement.find({}, {
				_id: 1,
				facultyId: 1,
				statement: 1,
				title: 1,
				selectedBy: 1,
			});
			// Get all the groups as we need to map the selectedBy field of problem statement
			const groupData = await GroupSchema.find({}, {
				_id: 1,
				groupNumber: 1,
			});
			// Map the groups by id
			const groups = {};
			groupData.forEach(group => {
				groups[group._id] = group;
			});
			// Map the problem statements by faculty id as we need to send the problem statements for each faculty
			let problemStatementsMap = {};
			problemStatements.forEach(problemStatement => {
				const facultyId = problemStatement.facultyId;
				// If the faculty id is not present in the map, add it
				if (!problemStatementsMap[facultyId]) {
					problemStatementsMap[facultyId] = [];
				}

				// Push the problem statement in the array
				problemStatementsMap[facultyId].push({
					_id: problemStatement._id,
					statement: problemStatement.statement,
					selectedBy: groups[problemStatement.selectedBy],
					title: problemStatement.title,
				});
			});
			// Update the response
			response = users.map(user => {
				return {
					...user._doc,
					problemStatements: problemStatementsMap[user._id],
				};
			});
		}

		return res.status(200).json(response);
	} catch (err) {
		console.error(err);
		res.status(500).json('Internal Server Error');
	}
};

async function getUserGroup(id) {
	const groupData = await GroupSchema.findOne({
		groupMembers: { $in: [id] },
	});
	let group = [];
	if (groupData) group = await getGroupData(groupData._id);
	return group;
}



module.exports = {
	getUserData,
	updateUser,
	getUsers,
	getUserGroup
};

