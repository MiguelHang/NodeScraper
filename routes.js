const express = require('express');
let api = express.Router();

let scraper = require('./index');

// api.get('/scan', scraper.search);
api.post('/scan', scraper.search);

module.exports = api;