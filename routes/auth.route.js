const authController = require("../controllers/auth.controller");
const authMw = require("../middlewares/auth.mw");

module.exports = (app) => {
	app.post("/ecomm/api/v1/auth/signup", [authMw.verifySignUpBody], authController.signup);
};
