// index.js
// Express
const express = require('express')
const app = express()
// Pug
const pug = require('pug')
app.set('view engine', 'pug')


// set static files folder
app.use(express.static('views'))
app.use(express.static('stylesheets'))

// error handling





//app.set('views', '/views')

	/////////////////////////////
	// Declare Express routes //
	////////////////////////////
// index	
app.get('/', function (req, res) {
  res.render('index')
})
// Books routes
app.get('/books/new', function (req, res) {
  res.render('new_book')
})
app.get('/books', function (req, res) {
  res.render('all_books')
})
app.get('books?filter=overdue', function (req, res) {
  res.render('overdue_books')
})
app.get('/books?filter=checked_out', function (req, res) {
  res.render('checked_books')
})
app.get('/return_book', function (req, res) {
  res.render('return_book')
})

// Patrons routes
app.get('/patrons/new', function (req, res) {
  res.render('new_patron')
})
app.get('/patrons', function (req, res) {
  res.render('all_patrons')
})

// Loans routes
app.get('/loans/new', function (req, res) {
  res.render('new_loan')
})
app.get('/loans', function (req, res) {
  res.render('all_loans')
})
app.get('loans?filter=overdue', function (req, res) {
  res.render('overdue_loans')
})
app.get('/loans?filter=checked_out', function (req, res) {
  res.render('checked_loans')
})

// handling 404 errors
app.get('/*', function (req, res) {
    res.render('error');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})