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

exports.fatchAllCategory = async (req, res) => {
	try {
		const allCategories = await category_model.find({});
		if (allCategories.length === 0)
			res.status(204).send({
				message: "No category found",
			});

		const requiredData = allCategories.map((category) => ({
			category_name: category.name,
			category_description: category.description,
		}));

		return res.status(200).send(requiredData);
	} catch (err) {
		return res.status(400).send({
			message: "Error ! while fetching all category",
		});
	}
};

exports.editCategory = async (req, res) => {
	const { name, description } = req.body;
	if (!name || !description) {
		return res.status(400).send({ message: "Name and description are required." });
	}

	try {
		const category = await category_model.findOne({ name: req.query.name });
		if (!category) {
			return res.status(404).send({
				message: "category not found",
			});
		}

		await category_model.findOneAndUpdate(
			{ _id: category._id },
			{
				$set: { name: name, description: description },
			}
		);

		return res.status(200).send({
			message: `Successfully edited !`,
		});
	} catch (err) {
		console.log("Errror while editing category", err);
		res.status(500).send({
			message: "Error while editing category",
		});
	}
};

exports.deleteCategory = async (req, res) => {
	try {
		const category = await category_model.findOne({ name: req.body.name });
		if (!category) {
			return res.status(400).send({
				message: "category not found !",
			});
		}
		await category_model.deleteOne(category);
		return res.status(200).send({
			message: `Successfully deleted !`,
		});
	} catch (err) {
		console.log("Errror while deleting category", err);
		res.status(500).send({
			message: "Error while deleting category",
		});
	}
};
