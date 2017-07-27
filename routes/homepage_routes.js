const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

// ==Homepage==

router.get('/', function (req, res) {
  res.render('index')
})

// ==Login==

router.get('/', function (req, res) {
  res.render('index', { message: req.flash('loginMessage')})
})

router.post('/', passport.authenticate('local-login', {
  successRedirect: '/profile', // redirect to secure profile
  failureRedirect: '/', // redirect back to login page
  failureFlash: true // enable flash messages
}))

// ==Signup==

router.get('/signup', function (req, res) {
  res.render('signup', req.flash('signupMessage'))
})

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/profile', // redirects to secure profile page
  failureRedirect: '/signup', // redirects back to signup page
  failureFlash: true // enables flash message

}))

module.exports = router
