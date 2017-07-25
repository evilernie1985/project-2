const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const User = require('../models/Users_model')

// passport session setup =================================

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user)
  })
})

// local signup ==========================================

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
function (req, email, password, done) {
  process.nextTick(function () {
    // look in db for email matching form's email
    // to see if email already exists
    User.findOne({'local.email': email}, function (err, user) {
      // if there's an err, return err
      if (err) {
        return done(err)
      }

      // if email already exists in db, flash err message
      if (user) {
        return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
      } else {
        // if email not in db, then create new user
        var newUser = new User()
        // set user's local credentials
        newUser.local.email = email
        newUser.local.password = newUser.generateHash(password)

        // save new user
        newUser.save(function (err) {
          if (err) throw err
          return done(null, newUser)
        })
      }
    })
  })
}))

module.exports = passport
