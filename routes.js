const express = require('express');
let api = express.Router();

let scraper = require('./index');

api.get('/', scraper.prueba);
api.post('/scan', scraper.search);
api.get('/build', scraper.buldDB);

module.exports = api;