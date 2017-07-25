const express = require('express')
const router = express.Router()

// ==Logout==

app.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})
