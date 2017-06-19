const express = require('express');
var router = express.Router();


// Loans routes
router.get('/new', function (req, res) {
  res.render('new_loan')
})
router.get('/', function (req, res) {
  res.render('all_loans')
})




router.get('loans?filter=overdue', function (req, res) {
  res.render('overdue_loans')
})
router.get('/loans?filter=checked_out', function (req, res) {
  res.render('checked_loans')
})


module.exports = router;