const express = require('express')
const router = express.Router()

// ==Profile Page==

app.get('/profile', function (req, res) {
  res.render('profile', {
    user: req.user
  })
})

// == isLoggedIn middleware==
function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}