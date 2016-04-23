'use strict';

var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var qs = require('querystring');
var bodyParser = require("body-parser");

var app = express();

var routes = require('./app/routes/routes.js');

// BodyParser to avoid mess with hacking apart the body of the POST request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('dotenv').load();
mongoose.connect(process.env.MONGOLAB);

// Where to keep views and static assets
//app.set('views', __dirname + '/public/views');
//app.use(express.static(__dirname + '/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
app.use('/public', express.static(process.cwd() + '/public'));
app.use('/common', express.static(process.cwd() + '/app/common'));

app.use(session({
	secret: 'secretClementine',
	resave: false,
	saveUninitialized: true
}));

routes(app);

var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');
});



