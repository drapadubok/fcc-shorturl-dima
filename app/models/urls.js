'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    AutoIncrement = require('mongoose-auto-increment');

AutoIncrement.initialize(mongoose.connection);

var UrlSchema = new Schema({
	long_url: { type: String, unique: true, dropDups: true }
});

// shortUrl will be added and automatically incremented
UrlSchema.plugin(AutoIncrement.plugin, { model: "Url", field: "short_url"});

var Url = mongoose.model('Url', UrlSchema);

module.exports = Url;

    
    