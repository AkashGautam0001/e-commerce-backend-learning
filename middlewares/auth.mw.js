const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const auth_config = require("../configs/auth.config");
const { isValidObjectId } = require("mongoose");
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

const verifySignInBody = (req, res, next) => {
	if (!req.body.userId) {
		return res.status(400).send({
			message: "Error ! userId is not provided.",
		});
	}
	if (!req.body.password) {
		return res.status(400).send({
			message: "Error ! password is not provided.",
		});
	}
	next();
};

const verifyToken = (req, res, next) => {
	const token = req.headers["x-access-token"];
	if (!token) {
		return res.status(403).send({
			message: "No token found : Unauthorised",
		});
	}

	jwt.verify(token, auth_config.secret, async (err, decoded) => {
		if (err) {
			return res.status(403).send({
				message: "UnAuthorised !!",
			});
		}
		const user = await user_model.findOne({ userId: decoded.id });
		if (!user) {
			return res.status(400).send({
				message: "Unauthorised ! this user is does'nt exit",
			});
		}
		req.user = user;
		next();
	});
};

const isAdmin = (req, res, next) => {
	const user = req.user;
	if (user && user.userType == "ADMIN") {
		next();
	} else {
		return res.status(403).send({
			message: "Only ADMIN users are allowed to access.",
		});
	}
};

module.exports = {
	verifySignUpBody: verifySignUpBody,
	verifySignInBody: verifySignInBody,
	verifyToken: verifyToken,
	isAdmin: isAdmin,
};
