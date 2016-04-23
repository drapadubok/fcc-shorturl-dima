'use strict';

var path = process.cwd();
var shortener = require(path + "/app/controllers/shortener");

module.exports = function (app) {
	app.route('/new/*')
		.get(function (req, res) {
			// make sure it actually is a url
			var uri = shortener.getValidatedUrl(req.params[0]);
			if (uri === "Error") {
				// respond with "Error" if not
				res.send(uri);
			} else {
				// First try to fetch, save if not already in db
				// cook the correct response object
				var promisedUrl = shortener.getShortUrl(uri);
				promisedUrl.then(function(shorturi){
					res.send(shorturi);
				});
			}
		});
		
	app.route('/:shortenedUrl')
		.get(function (req, res) {
			var shorturi = req.params.shortenedUrl;
			shortener.getLongUrl(shorturi).then(function(longuri) {
				res.redirect(longuri);
			});
		});
};