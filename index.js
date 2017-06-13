// index.js
// Express
const express = require('express')
const app = express()
// Pug
const pug = require('pug')
app.set('view engine', 'pug')


// set static files folder
app.use(express.static('views'))
//app.set('views', '/views')

// Declare Express routes
app.get('/', function (req, res) {
  res.render('index')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})