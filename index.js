let async = require('async');
let segundamano = require('./segundamano');
let motosnet = require('./motosnet');


function prueba (req, res){
    res.status(200).send({
        message: 'triying api'
    }); 
}

function search(req, res){
    async.series([
        segundamano.retrieveAds.bind(null, 'cbr', 'madrid', 'honda'),
        motosnet.retrieveAds.bind(null, 'cbr', 'madrid', 'honda')
    ], (err, results) => {
        if (err) return console.log(err);
        console.log(results[0]);
    });
    
}

module.exports =  {
    prueba,
    search
}