const user_model = require("../models/user.model");
const verifySignUpBody = async (req, res, next) => {
	try {
		if (!req.body.name) {
			return res.status(400).send({
				message: "Failed ! Name is not provided",
			});
		}

		if (!req.body.email) {
			return res.status(400).send({
				message: "Failed ! Email is not provided",
			});
		}
		if (!req.body.password) {
			return res.status(400).send({
				message: "Failed ! Password is not provided",
			});
		}
		if (!req.body.userId) {
			return res.status(400).send({
				message: "Failed ! UserId is not provided",
			});
		}

		const user = await user_model.findOne({ userId: req.body.userId });
		if (user) {
			return res.status(400).send({
				message: "Failed ! user is already present",
			});
		}

		next();
	} catch (err) {
		console.log("Error while validating the request");
		res.status(500).send({
			message: "Error while validating the request body",
		});
	}
};

module.exports = {
	verifySignUpBody: verifySignUpBody,
};
