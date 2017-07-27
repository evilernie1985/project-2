const express = require('express')
const router = express.Router()

// query API =====================

router.get('/', function (req, res) {
  res.render('apod/index')
})

router.post('/search', function (req, res) {
  res.send(req.body)
  

})

module.exports = router
