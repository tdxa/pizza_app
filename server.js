const express = require('express');
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path')

const app = express();
exports.app = app;


// Assets
app.use(express.static('public'));

app.use(expressLayout);
app.set('views', path.join(__dirname,'/src/views'))
app.set('view engine','ejs')

// Import routes
require('./routes/web')(app);



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Example app listening on ${port} port!`));