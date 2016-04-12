var _ = require("underscore");
var models = require("../models");

var Bear = models.Bear;

var buildPage = function(req, res) 
{
	
	Bear.BearModel.findByOwner(req.session.account._id, function(err, docs) 
	{
		
		if(err) {
			console.log(err);
			return res.status(400).json({error: "An error occurred"});
		}
		
		res.render("app", { csrfToken: req.csrfToken(), bears: docs});
	});
};

var buildBear = function(req, res) 
{
	
	if(!req.body.name || !req.body.species || !req.body.color || !req.body.cubs) {
		return res.status(400).json({error: "The name, species, color, and number of cubs are all required"});
	}
	
	var bearData = {
		name: req.body.name,
		species: req.body.species,
		color: req.body.color,
		cubs: req.body.cubs,
		owner: req.session.account._id
	};
	
	var newBear = new Bear.BearModel(bearData);
	
	newBear.save(function(err) 
	{
		if(err) {
			console.log(err);
			return res.status(400).json({error: "An error occurred"});
		}
		
		res.json({redirect: "/storedBears"});
	});
	
};

var aboutPage = function(req, res) 
{
	Bear.BearModel.findByOwner(req.session.account._id, function(err){
		
		if(err){
			console.log(err);
			return res.status(400).json({error: "An error occured"});
		}
		
		res.render("about", { csrfToken: req.csrfToken()});
	
		});
};

var about = function (req, res)
{
	res.json({redirect: "/buildBear"});
};

var storedBears = function(req, res) 
{
	Bear.BearModel.findByOwner(req.session.account._id, function(err, docs){
		
		if(err){
			console.log(err);
			return res.status(400).json({error: "An error occured"});
		}
		
		res.render("built", { csrfToken: req.csrfToken(), bears: docs});
	});
};

var deleteBear = function(req, res) 
{
	
	Bear.BearModel.remove({_id: req.params._id}, function(err) {
		if(err) {
			res.json(err);
		}
		else {
			res.redirect("/storedBears");
		}
	});
};

module.exports.buildPage = buildPage;
module.exports.built = buildBear;
module.exports.aboutPage = aboutPage;
module.exports.about = about;
module.exports.storedBears = storedBears;
module.exports.deleteBear = deleteBear;