'use strict';


// Express
const express = require('express');
const pug = require('pug');
const app = express();
var path = require('path');

// Include Router
var router = express.Router();

// Sequelize
var sequelize = require('./models').sequelize;


// Set routes
var books = require('./routes/books');
var patrons = require('./routes/patrons');
var loans = require('./routes/loans');



// Set views

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// set static files folder
//app.use(express.static('views'));
app.use(express.static('stylesheets'));




// index	
app.get('/', function (req, res) {
  res.render('home')
})

app.use('/books', books);
app.use('/patrons', patrons);
app.use('/loans', loans);


//app.set('views', '/views')

	/////////////////////////////
	// Declare Express routes //
	////////////////////////////






// handling 404 errors
//app.get('/*', function (req, res) {
//    res.render('error');
//});



app.listen(3000, function () {
  console.log('App listening on port 3000!')
})