const mongoose = require("mongoose");
const category_schema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Category", category_schema);
