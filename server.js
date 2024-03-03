const express = require("express");
const mongoose = require("mongoose");
const server_config = require("./configs/server.config");
const db_config = require("./configs/db.config");
const user_model = require("./models/user.model");
const bcrypt = require("bcryptjs");
const app = express();

app.use(express.json()); //Think

mongoose.connect(db_config.DB_URL);
const db = mongoose.connection;

db.on("error", () => {
	console.log("ERROR : error while connecting database");
});

db.once("open", () => {
	console.log("MongoDB is successfully connected !");
	init();
});

//for waiting
async function init() {
	let user = await user_model.findOne({
		userId: "admin",
	});
	if (user) {
		console.log("Admin is already created");
		return;
	}
	try {
		user = await user_model.create({
			name: "Akash Gautam",
			userId: "admin",
			email: "akashgautam@google.com",
			userType: "ADMIN",
			password: bcrypt.hashSync("12345", 8),
		});
		console.log("Admin Created!", user);
	} catch (err) {
		console.log("Error while creating admin", err);
	}
}
require("./routes/auth.route")(app);
require("./routes/category.route")(app); //stich constroller in server.js

app.listen(server_config.PORT, () => {
	console.log(`App started at PORT : ${server_config.PORT}`);
});
