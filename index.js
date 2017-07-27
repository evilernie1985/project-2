require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
const MongoStore = require('connect-mongo')

// connect to mongodb =========================================

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/wdi-project-2'

mongoose.Promise = global.Promise
mongoose.connect(url, {
  useMongoClient: true
}).then(
  function () {
    console.log('connected to mongo successfully')
  },
  function (err) {
    console.log(err)
  }
)

// setup express session ===================================
const app = express()
app.use(session({
  store: new MongoStore({
    url: url
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// initialize passport  ====================================

const passport = require('./config/passport')

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// initialize handlebars =====================================

app.use(express.static('public'))

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')
// utility middleware =======================================
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

// Routes ===================================================

app.get('/', function (req, res) {
  res.render('index')
})

const apodRoutes = require('./routes/apod_routes')
app.use('/apod', apodRoutes)

// Open port ===============================================

const port = process.env.PORT || 8000
app.listen(port, function () {
  console.log('express is running on port ' + port)
})
