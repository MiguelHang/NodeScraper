
const request = require('request');
const cheerio = require('cheerio');

const site = 'atoevolution.com';



function retrieveAds( brand, callback) {
    console.log(brand)
    let options =  {
        url: `https://www.autoevolution.com/moto/${brand.replace(/ /g, '-')}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:41.0) Gecko/20100101 Firefox/41.0',
            'Accept': '*/*',
            'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3'
        }
    };

    let ads = [];
    request(options, function(err, resp, body) {
        if (err) {
            console.log(err)
            return callback(null, {
                'site': site,
                'error': true,
                'msg': err
            });
        }

        $ = cheerio.load(body)
        $('.col2width').each(function() {
            
            let model = $(this).find('a').attr('title');
            console.log(model)
            ads.push(model);
        });

        callback(null, {
            site,
            'error': false,
            ads
        });
    });
}


module.exports = {
    retrieveAds
}
