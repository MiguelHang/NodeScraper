const express = require('express');
let app = express();
let routes = require('./routes');

app.use('/api', routes);

module.exports = app;