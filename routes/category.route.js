const category_controller = require("../controllers/category.controller");
const auth_mw = require("../middlewares/auth.mw");
module.exports = (app) => {
	app.post("/ecomm/api/v1/auth/category", [auth_mw.verifyToken, auth_mw.isAdmin], category_controller.createNewCategory);
};
