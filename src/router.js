var controllers = require("./controllers");
var mid = require("./middleware");

var router = function(app) {
	
	app.get("/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
    app.post("/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
    app.get("/signup", mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
    app.post("/signup", mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
    app.get("/logout", mid.requiresLogin, controllers.Account.logout);
    app.get("/buildBear", mid.requiresLogin, controllers.Bear.buildPage);
    app.post("/buildBear", mid.requiresLogin, controllers.Bear.built);
	app.get("/aboutPage", mid.requiresLogin, controllers.Bear.aboutPage);
	app.post("/aboutPage", mid.requiresLogin, controllers.Bear.about);
	app.get("/storedBears", mid.requiresLogin, controllers.Bear.storedBears);
	app.post("/storedBears", mid.requiresLogin, controllers.Bear.built);
    app.get("/killer/:_id",  mid.requiresLogin, controllers.Bear.deleteBear);
    app.get("/", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);	
};

module.exports = router;