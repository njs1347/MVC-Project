var models = require("../models");

var Account = models.Account;

var loginPage = function(req, res) 
{
	res.render("login", { csrfToken: req.csrfToken() });
};

var login = function(req, res) 
{
	
	if(!req.body.username || !req.body.password) {
		return res.status(400).json({error: "All fields are required"});
	}
	
	Account.AccountModel.authenticate(req.body.username, req.body.password, function(err, account) {
		if(err || !account) {
			return res.status(401).json({error: "Wrong username or password"});
		}
		
		req.session.account = account.toAPI();
		
		res.json({redirect: "/buildBear"});
	});
};

var logout = function(req, res) 
{
	req.session.destroy();
	res.redirect("/");
};

var signupPage = function(req, res) 
{
	res.render("signup", { csrfToken: req.csrfToken() });
};

var signup = function(req, res) 
{
	
	if(!req.body.username || !req.body.password || !req.body.password2) {
		return res.status(400).json({error: "All fields are required"});
	}
	
	if(req.body.password !== req.body.password2) {
		return res.status(400).json({error: "Passwords do not match"});
	}
	
	Account.AccountModel.generateHash(req.body.password, function(salt, hash) {
		
		var accountData = {
			username: req.body.username,
			salt: salt,
			password: hash
		};
		
		var newAccount = new Account.AccountModel(accountData);
		
		newAccount.save(function(err) {
			if(err) {
				console.log(err);
				return res.status(400).json({error: "An error occurred"});
			}
			
			req.session.account = newAccount.toAPI();
			
			res.json({redirect: "/aboutPage"});
		});
	});
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signupPage = signupPage;
module.exports.signup = signup;