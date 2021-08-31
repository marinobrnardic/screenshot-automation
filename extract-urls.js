https = require('https');
const { sitemapURL } = require('./website-config.js');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
let sitemapUrls = [];

parser.on('error', function(err) { console.log('Parser error', err); });

var data = '';
https.get(sitemapURL, function(res) {
    if (res.statusCode >= 200 && res.statusCode < 400) {
      res.on('data', function(data_) { data += data_.toString(); });
      res.on('end', function() {

        parser.parseString(data, function(err, result) {
            for (let i = 0; i < result.urlset.url.length; i++){

              let url = result.urlset.url[i].loc;
              sitemapUrls.push(url);

            }

          console.log('URLs successfuly extracted from sitemap.xml');
        });

      });
    }
  });

module.exports = {
  sitemapUrls,
};