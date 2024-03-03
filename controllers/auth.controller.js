const bcrypt = require("bcryptjs");
const user_model = require("../models/user.model");
const jwt = require("jsonwebtoken");
const secret = require("../configs/auth.config");
exports.signup = async (req, res) => {
	const request_body = req.body;
	console.log(request_body);
	const userObj = {
		name: request_body.name,
		userId: request_body.userId,
		email: request_body.email,
		userType: request_body.userType,
		password: bcrypt.hashSync(request_body.password, 8),
	};

	try {
		const user_created = await user_model.create(userObj);

		//In this Object, we does not pass password
		const user_obj = {
			name: user_created.name,
			userId: user_created.userId,
			email: user_created.email,
			userType: user_created.userType,
			createdAt: user_created.createdAt,
			updatedAt: user_created.updatedAt,
		};
		res.status(201).send(user_obj);
	} catch (err) {
		console.log("Error while registering the user", err);
		res.status(500).send({
			message: "Some error happened while resgistering the user",
		});
	}
};

exports.signin = async (req, res) => {
	const user = await user_model.findOne({ userId: req.body.userId });
	if (user === null) {
		return res.status(400).send({ message: "userId is incorrect" });
	}
	const isPassword = bcrypt.compareSync(req.body.password, user.password);
	if (!isPassword) {
		return res.status(401).send({ message: "Wrong password" });
	}

	const token = jwt.sign({ id: user.userId }, secret.secret, { expiresIn: 120 });

	res.status(200).send({
		name: user.name,
		userId: user.userId,
		email: user.email,
		userType: user.userType,
		accesToken: token,
	});
};
