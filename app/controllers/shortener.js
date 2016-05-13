'use strict';

var validUrl = require('valid-url');
var Url = require('../models/urls');

var shortener = {
    
    getValidatedUrl: function(str) {
    	return validUrl.isUri(str) ? str : "Error";
    },
    
    getLongUrl: function(uri) {
    	var urlPromise = Url.findOne({"short_url": uri}).exec();
    	return urlPromise.then( function(urlObject) {
    		return urlObject.long_url;
    	}).catch(function(err) {
    		console.log(err);
    	});
    },
    
    getShortUrl: function(uri) {
    	// uri is validated url from request
    	// if uri is in longurl records, if yes, return object
    	var urlPromise = Url.findOne({"long_url": uri}).exec();
    	
    	return urlPromise.then( function(uriObject) {
    	    // if no record in db, add new one
        	if (uriObject === null) {
        		var newUri = new Url({"long_url": uri});
        		return newUri.save();
        	} else {
        	    return uriObject;
            }}).then( function(uriObject) {
        	    return {
        			original_url: uriObject.long_url,
        			short_url: uriObject.short_url
        		};
            }).catch(function(err) {
                console.log(err);
            }
        );
    }
};

module.exports = shortener;






