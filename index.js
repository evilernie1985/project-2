const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')

//connect to mongodb =========================================

const url = 'mongodb://localhost:27017'

mongoose.Promise = global.Promise
mongoose.connect(url, {
  useMongoClient: true
}).then(function () {
  console.log('connected to mongo successfully')
}),
function (err) {
  console.log(err)
}

//initialize passport ========================================
const passport = require('./config/passport')

app.use(session({ secret: 'shesellsseashells'}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash()
)

// initialise handlebars =====================================

app.engine('handlebars', exphbs({
  defautLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.use(morgan('dev'))
// app.use(bodyParser)
// app.use(cookieParser)

const homepageRoutes = require('./routes/homepage_routes')
app.use('/', homepageRoutes)

const port = process.env.PORT || 9000
app.listen(port, function () {
  console.log('express is running on port ' + port)
})
