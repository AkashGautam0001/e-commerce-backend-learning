const category_model = require("../models/category.model");

exports.createNewCategory = async (req, res) => {
	const cat_data = {
		name: req.body.name,
		description: req.body.description,
	};

	try {
		const category = await category_model.create(cat_data);
		return res.status(201).send(category);
	} catch (err) {
		console.log("Errror while creating category", err);
		res.status(500).send({
			message: "Error while creating category",
		});
	}
};
