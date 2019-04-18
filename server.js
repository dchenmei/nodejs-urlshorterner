'use strict';

var dotenv = require('dotenv');
dotenv.config();

var express = require('express');
var mongo = require('mongodb');
//var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

// mount the body-parser here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));

app.use('/public', express.static(process.cwd() + '/public'));

mongo.connect(process.env.DATABASE, (err, client) => {
	if (err) {
		console.log("Oops, looks like the database is broken");
	}
	
	const db = client.db('urls');

	/*
	db.collection('shortUrls').findOne({url:"www.google.com"}, (err, data) => {
		if (err) {
			console.log("Something wrong with the db");
		} else if (data == null) {
			console.log("Not found...");
		} else {
			console.log(data);
		}
	});
	*/

	app.get('/', function(req, res){
	  res.sendFile(process.cwd() + '/views/index.html');
	});

	app.post("/api/shorturl/new", function (req, res) {

		db.collection('shortUrls').insertOne({url: req.body.url}, (err, id) => {
			if (err) {
				console.log("Something bad went wrong");
			} else {
				res.json({"original_url" : req.body.url, "short_url" : 111});
			}
		});
		
	});


	app.listen(port, function () {
	  console.log('Node.js listening ...');
	});
});
