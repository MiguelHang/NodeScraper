let async = require('async');
let segundamano = require('./scrap/segundamano');
let motosnet = require('./scrap/motosnet');


function search(req, res){
    let params = req.body

    let model = params.model
    let locatio = params.location
    let brand = params.brand

    async.series([
        segundamano.retrieveAds.bind(null, model, locatio, brand),
        motosnet.retrieveAds.bind(null, model, locatio, brand)
    ], (err, results) => {
        if (err){
            return console.log(err);
        }else{
            return res.status(200).send({
                results
            });
        } 
    });
    
}

module.exports =  {
    search
}