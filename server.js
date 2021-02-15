const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path')
const mongoose = require('mongoose');

const app = express();
exports.app = app;

//Database connection
const db = require('./app/config/keys').MongooseURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB conncted"))
    .catch(err => console.log(err))


// Assets
app.use(express.static('public'));

app.use(expressLayout);
app.set('views', path.join(__dirname, '/src/views'))
app.set('view engine', 'ejs')

// Import routes
require('./routes/web')(app);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on ${port} port!`));