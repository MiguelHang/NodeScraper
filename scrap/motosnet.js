
const request = require('request');
const cheerio = require('cheerio');

const site = 'motos.net';



function retrieveAds(model, location, brand, callback) {
    let options =  {
        // http://motos.coches.net/ocasion/bmw/f_800_gt/madrid?pg={page}&Version=f%20800%20gt&fi=SortDate
        url: `https://motos.coches.net/ocasion/${brand.replace(/ /g, '-')}/${model.replace(/ /g, '_')}/${location.replace(' ', '-')}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:41.0) Gecko/20100101 Firefox/41.0',
            'Accept': '*/*',
            'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
            'Referer': `http://motos.coches.net/ocasion/${brand.replace(/ /g, '-')}/${model.replace(/ /g, '_')}/`,
        }
    };

    let ads = [];
    request(options, function(err, resp, body) {
        if (err) {
            return callback(null, {
                'site': site,
                'error': true,
                'ads': ads
            });
        }

        $ = cheerio.load(body)
        $('#rows .lnkad').each(function() {
            let title = $(this).find('h2').text().trim();
            let img = $(this).find('.p').attr('style');
            let price = $(this).find('.preu').text().trim();
            let date = $(this).find('p.data').text().trim();
            let link = 'https://' + site + $(this).attr('href').trim();
            let km = $(this).find('.dades .d1').text().trim().replace(' km', '');
            let year = $(this).find('.dades .d2').text().trim();

            let moto = {
                site,
                title,
                img: img ? img.substring(img.lastIndexOf("backgrond:url('") + 17 , img.lastIndexOf("')")) : 'none',
                price,
                link,
                date,
                km,
                year
            };
            ads.push(moto);
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
