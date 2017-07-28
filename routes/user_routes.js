const express = require('express')
const router = express.Router()
const passport = require('../config/passport')

// ==Login==

router.get('/login', function (req, res) {
  res.render('user/login', { message: req.flash('loginMessage')})
})

// router.post('/login', passport.authenticate('local-login', {
//   successRedirect: '/profile', // redirect to secure profile
//   failureRedirect: '/', // redirect back to login page
//   failureFlash: true // enable flash messages
// }))

// ==Signup==

router.get('/signup', function (req, res) {
  res.render('user/signup', req.flash('signupMessage'))
})

// router.post('/signup', passport.authenticate('local-signup', {
//   successRedirect: '/profile', // redirects to secure profile page
//   failureRedirect: '/signup', // redirects back to signup page
//   failureFlash: true // enables flash message
//
// }))

module.exports = router
