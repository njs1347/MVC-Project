var mongoose = require('mongoose');
var _ = require('underscore');

var BearModel;

var setName = function(name) {
	return _.escape(name).trim();
};

var BearSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		set: setName
	},
	
	species: {
		type: String,
		trim: true,
		required: true
	},
	
	color: {
		type: String,
		trim: true,
		required: true
	},
	
	cubs: {
		type: Number,
		min: 0,
		required: true
	},
	
	owner: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
	},
	
	createdData: {
		type: Date,
		default: Date.now
	}
	
});

BearSchema.methods.toAPI = function() {
	return {
		name: this.name,
		species: this.species,
		color: this.color,
		cubs: this.cubs
	};
};

BearSchema.statics.findByOwner = function(ownerId, callback) {
	
	var search = {
		owner: mongoose.Types.ObjectId(ownerId)
	};
	
	return BearModel.find(search).select("name species color cubs").exec(callback);
};


BearModel = mongoose.model('Bear', BearSchema);


module.exports.BearModel = BearModel;
module.exports.BearSchema = BearSchema;