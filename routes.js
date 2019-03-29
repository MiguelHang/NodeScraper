const express = require('express');
let api = express.Router();

let scraper = require('./index');

api.get('/prueba', scraper.prueba);

module.exports = api;