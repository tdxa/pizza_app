require('dotenv').config()

const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path')
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash')
const passport = require('passport');
const MongoDBStore = require('connect-mongo')(session);

//Passport config
require('./app/config/passport')(passport);

const app = express();
exports.app = app;

//Database connection
const db = require('./app/config/keys').MongooseURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB conncted"))
    .catch(err => console.log(err))


// Session
let MongoStore = new MongoDBStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions'
})

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //24hours
}));


//Passport
app.use(passport.initialize());
app.use(passport.session());



app.use(flash())
// Assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

//Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next()
})


// Layout
app.use(expressLayout);
app.set('views', path.join(__dirname, '/src/views'))
app.set('view engine', 'ejs')

// Import routes
require('./routes/web')(app);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on ${port} port!`));