
const request = require('request');
const cheerio = require('cheerio');
// let moto = requiere('./moto');

const site = 'segundamano';



function retrieveAds(model, location, brand, callback) {
    let options =  {
        url: `https://www.vibbo.com/motos-${brand.replace(/ /g, '-')}-de-segunda-mano-${location.replace(/ /g, '-')}/${model.replace(/ /g, '-')}.htm?sort_by=1&od=1`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:41.0) Gecko/20100101 Firefox/41.0',
            'Accept': '*/*',
            'Accept-Language': 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3',
            'Referer': `https://www.vibbo.com/motos-${brand.replace(/ /g, '-')}-de-segunda-mano-${location.replace(/ /g, '-')}/${model.replace(/ /g, '-')}.htm?sort_by=1&od=1`,
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
        $('.list_ads_row').each(function() {
            var title = $(this).find('.subjectTitle').text().trim();
            var price = $(this).find('.subjectPrice').text().trim();
            var date = $(this).find('.dateLink').text().trim();
            var link = $(this).find('.subjectTitle').attr('href').trim();
            var id = link.match(/\/(a[0-9]+)\//)[1];
            var km = $(this).find('.add-info .infoBottom').text().trim().replace(/.*?\-\s(.*?)\skm/, '$1');
            var year = $(this).find('.add-info .infoBottom').text().trim().replace(/[\s\S]*?año\s(\d+)/, '$1');
            // [\s\S]* means "spaces and no spaces". this is like .* but matching also line breaks. so this is a "multiline regex"
            let moto = {
                'site': site,
                'title': title,
                'price': price,
                'link': link,
                'id': id,
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
