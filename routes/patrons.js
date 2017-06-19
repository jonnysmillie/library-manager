const express = require('express');
var router = express.Router();


// Patrons routes
router.get('/new', function (req, res) {
  res.render('new_patron')
})
router.get('/', function (req, res) {
  res.render('all_patrons')
})


module.exports = router;