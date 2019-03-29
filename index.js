let async = require('async');
let segundamano = require('./segundamano');
let motosnet = require('./motosnet');
async.series([
    // segundamano.retrieveAds.bind(null, 'cbr', 'madrid', 'honda')
    motosnet.retrieveAds.bind(null, 'cbr', 'madrid', 'honda')
], (err, results) => {
    if (err) return console.log(err);
    console.log(results[0]);
});
