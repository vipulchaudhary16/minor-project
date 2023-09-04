const fs = require('fs');

const getConstraints = async(req, res) => {
  try {
    const data = fs.readFileSync('CONSTRAINTS.json');
    const constraints = JSON.parse(data);
    res.status(200).json(constraints);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal server error');
  }
}

const updateConstraints = async (req, res) => {
	try {
		const { constraints } = req.body;
		const data = JSON.stringify(constraints);
    // create a new file if it doesn't exist
		fs.writeFileSync('CONSTRAINTS.json', data);
		res.status(200).json(constraints);
	} catch (error) {
		console.log(error);
		res.status(500).send('Internal server error');
	}
};



module.exports = {
	updateConstraints,
  getConstraints
};
