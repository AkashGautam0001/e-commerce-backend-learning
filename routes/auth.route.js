const authController = require("../controllers/auth.controller");
const authMw = require("../middlewares/auth.mw");

module.exports = (app) => {
	app.post("/ecomm/api/v1/auth/signup", [authMw.verifySignUpBody], authController.signup);
	app.get("/ecomm/api/v1/auth/signin", authController.signin);
};
