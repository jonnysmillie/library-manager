const express = require('express');
var router = express.Router();


var Books = require('../models').Books;
var Loans = require('../models').Loans;
var Patrons = require('../models').Patrons;

// Books routes
router.get('/new', function (req, res) {
  res.render('new_book')
})
router.get('/', function (req, res) {
  res.render('all_books')
})





router.get('books?filter=overdue', function (req, res) {
  res.render('overdue_books')
})
router.get('/books?filter=checked_out', function (req, res) {
  res.render('checked_books')
})
router.get('/return_book', function (req, res) {
  res.render('return_book')
})


module.exports = router;