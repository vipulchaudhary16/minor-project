const ProblemStatement = require('../../schema/ProblemStatement.schema');
const CONSTRAINTS = require("../../CONSTRAINTS.json")
const mongoose = require('mongoose');

const addNewProblemStatement = async (req, res) => {
	try {
		const {title, statement, domain } = req.body;
		const facultyId = req.user.id;
		const existingProblemStatements = await ProblemStatement.find({
			facultyId,
		}).countDocuments();
		console.log(existingProblemStatements);
		if (existingProblemStatements >= CONSTRAINTS.MAX_PROBLEM_STATEMENTS_PER_FACULTY) {
			return res.status(401).send('You have already added limited problem statements.')
		}
		const newProblemStatement = new ProblemStatement({
			title,
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
		const { id, statement, domain, title } = req.body;
		const facultyId = req.user.id;
		await ProblemStatement.findByIdAndUpdate(
			id,
			{ statement, domain, title },
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
		const { facultyId, q } = req.query;
		const pipeline = [];
		if (facultyId) {
			pipeline.push({
				$match: {
					facultyId: new mongoose.Types.ObjectId(facultyId)
				}
			})
		}
		if (q) {
			pipeline.push({
				$match: {
					$or: [
						{ statement: { $regex: q, $options: 'i' } },
						{ domain: { $regex: q, $options: 'i' } },
					],
				},
			})
		}
		pipeline.push(...[
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
				$lookup: {
					from: 'groups',
					localField: 'selectedBy',
					foreignField: '_id',
					as: 'selectedBy',
				},
			},
			{
				$unwind: {
					path: '$selectedBy',
					preserveNullAndEmptyArrays: true,
				},
			},
			{
				$project: {
					_id: 1,
					faculty: { _id: '$faculty._id', name: '$faculty.name' },
					statement: 1,
					domain: 1,
					title: 1,
					selectedBy: {
						_id: '$selectedBy._id',
						groupNumber: '$selectedBy.groupNumber',
					},
				},
			},
		])
		const problemStatementDetails = await ProblemStatement.aggregate(
			pipeline
		);
		return res.status(200).json(problemStatementDetails);
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
	getAllDomains,
};
