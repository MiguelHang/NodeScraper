let async = require('async');
let segundamano = require('./scrap/segundamano');
let motosnet = require('./scrap/motosnet');
let autoevolution = require('./scrap/autoevolution');


function prueba(req, res){
    return res.status(200).send({
        message: 'Scraper running'
    });
}

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

function brands(brand){
    
    async.series([
        autoevolution.retrieveAds.bind(null, brand),
    ], (err, results) => {
        if (err){
            return console.log(err);
        }else{
            return results
        } 
    });

}
function buldDB(req, res){

    const Brand = [
        "Adler","AEON","AERMACCHI","AJP","AJS","ALTA MOTORS","AMAZONAS","APRILIA","ARCTIC CAT","ARIEL","ATK","BAJAJ","BARIGO","BENELLI","BETA","BFG","Big Bear Choppers","Big Dog","BIMOTA","BMW","BORILE","BOSS HOSS","BRITTEN","BROUGH SUPERIOR","BSA","BUELL","CAGIVA","CAN-AM/ BRP","CANNONDALE","CARVER","CCM","CEMEC","CFMOTO","CHAK MOTORS","Christini","CONDOR","CONFEDERATE","CPI","CRS","DAELIM","Dafra Motos","DERBI","DNEPR","DUCATI","EBR Motorcycles","ECOSSE","ENERGICA","EXCELSIOR","FISCHER","GAS GAS","GEELY","GG MOTORRAD","GHEZZI-BRIAN","GILERA","HARLEY DAVIDSON","HARTFORD","HENDERSON","HERCULES","HERO","HESKETH","HIGHLAND","HODAKA","HONDA","HOREX","HUSABERG","HUSQVARNA","HYOSUNG","INDIAN","ITALJET","IZH","JAWA","JUNAK","KANUNI","KASINSKI","KAWASAKI","KTM","KYMCO","LAVERDA","LEHMAN TRIKES","LIFAN","LINHAI","MAGNI","MAICO","MALAGUTI","MARUSHO-LILAC","MASH","MATCHLESS","MBK","MEGELLI","MIDUAL","MIKILON","MODENAS","MONDIAL","MOTO GUZZI","MOTO MORINI","MOTOCZYSZ","MOTORHISPANIA","MOTUS","MTT","MUNCH","MV AGUSTA","MZ","NCR","NORTON","Orange County Choppers","OSSA","PETRONAS","PEUGEOT","PGO","PIAGGIO","POLARIS","PUCH","RIEJU MOTORS","ROYAL ENFIELD","SACHS","SCORPA","SHERCO","SIMSON","Super SOCO","SUZUKI","SWM","SYM","TGB","TRIUMPH","URAL","VELOCETTE","VENTO","VERUCCI","VESPA","VICTORY","VINCENT HRD","VOR","VOXAN","VYRUS","WAKAN","WHIZZER","WRM","YAMAHA","ZERO","ZUNDAPP"
      ]
    
    let result = []

    Brand.map((item) =>{
        let model = brands(item)
        let models = {
            brand: item,
            model
        }
        result.push(models)
    })

    return res.status(200).send({
        result
    })

}


module.exports =  {
    search,
    prueba,
    buldDB
}