const express = require('express');
const bodyParser = require('body-parser')
let app = express();
let routes = require('./routes');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use( (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method')
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE')
    res.header('Allow',  'GET, POST, PUT, OPTIONS, DELETE')
  
    next()
  })

app.use('/api', routes);

module.exports = app;