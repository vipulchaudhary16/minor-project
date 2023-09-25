const authorizeAdmin = (req, res, next) => {
    try {
        const user = req.user
        const { role } = user;
        if (role <= 0) {
            next();
        } else {
            res.status(401).send('Unauthorized')
        }
    } catch (error) {
        res.status(505).send('Internal server error');
        console.log(error);
    }
};

module.exports = { authorizeAdmin }