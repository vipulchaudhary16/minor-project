const ProblemStatement = require('../schema/ProblemStatement.schema');

const addNewProblemStatement = async (req, res) => {
	try {
		const { statement, domain } = req.body;gi
		const facultyId = req.user.id;
		const newProblemStatement = new ProblemStatement({
			facultyId,
			statement,
			domain,
		});
		await newProblemStatement.save();
		res.status(200).send('Problem statement added successfully');
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const updateProblemStatement = async (req, res) => {
	try {
		const { id, statement, domain } = req.body;
		const facultyId = req.user.id;
		await ProblemStatement.findByIdAndUpdate(
			id,
			{ statement, domain },
			{
				new: true,
			}
		);
		res.status(200).send('Problem statement updated successfully');
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const getProblemStatements = async (req, res) => {
	try {
		const { facultyId } = req.query;
		const problemStatements = await ProblemStatement.aggregate([
			{
				$lookup: {
					from: 'users',
					localField: 'facultyId',
					foreignField: '_id',
					as: 'faculty',
				},
			},
			{
				$unwind: '$faculty',
			},
			{
				$project: {
					_id: 1,
					statement: 1,
					domain: 1,
					faculty: {
						_id: 1,
						name: 1,
					},
				},
			},
		]);

		let filteredProblemStatements = problemStatements;
		if (facultyId) {
			filteredProblemStatements = problemStatements.filter(
				(problemStatement) => {
					return problemStatement.faculty._id.toString() === facultyId;
					return true;
				}
			);
		}

		res.status(200).json(filteredProblemStatements);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const searchInProblemStatements = async (req, res) => {
	try {
		const { facultyId, q, domain } = req.query;
		const searchConditions = {};
		if (q) {
			searchConditions.$or = [
				{ statement: { $regex: q, $options: 'i' } },
				{ domain: { $regex: q, $options: 'i' } },
			];
		}
		if (domain) {
			searchConditions.domain = domain;
		}
		if (facultyId) {
			searchConditions.facultyId = facultyId;
		}
		const matchingStatements = await ProblemStatement.find(searchConditions);
		res.status(200).json(matchingStatements);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

const getAllDomains = async (req, res) => {
	try {
		const domains = await ProblemStatement.distinct('domain');
		res.status(200).json(domains);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};

module.exports = {
	addNewProblemStatement,
	updateProblemStatement,
	getProblemStatements,
	searchInProblemStatements,
	getAllDomains,
};
