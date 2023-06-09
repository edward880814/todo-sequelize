const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const router = require("./routes");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const PORT = process.env.PORT || 3000

const usePassport = require('./config/passport')
usePassport(app)


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})



app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(router)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})