
const request = require('request');
const cheerio = require('cheerio');

const site = 'motos.net';



function retrieveAds(model, location, brand, callback) {
    let options =  {
        // http://motos.coches.net/ocasion/bmw/f_800_gt/madrid?pg={page}&Version=f%20800%20gt&fi=SortDate
        url: `http://motos.coches.net/ocasion/${brand.replace(/ /g, '-')}/${model.replace(/ /g, '_')}/${location.replace(' ', '-')}?pg={page}&Version=f%20800%20gt&fi=SortDate`,
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

        $ = cheerio.load(body);
        $('#rows .lnkad').each(function() {
            var title = $(this).find('h2').text().trim();
            var price = $(this).find('.preu').text().trim();
            var date = $(this).find('p.data').text().trim();
            var link = $(this).attr('href').trim();
            var km = $(this).find('.dades .d1').text().trim().replace(' km', '');
            var year = $(this).find('.dades .d2').text().trim();

            // [\s\S]* means "spaces and no spaces". this is like .* but matching also line breaks. so this is a "multiline regex"
            let moto = {
                'site': site,
                'title': title,
                'price': price,
                'link': link,
                'date': date,
                'km': km,
                'year': year
            };
            ads.push(moto);
        });

        callback(null, {
            'site': site,
            'error': false,
            'ads': ads
        });
    });
}

module.exports = {
    retrieveAds
}
