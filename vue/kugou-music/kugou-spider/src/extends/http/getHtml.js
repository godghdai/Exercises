const fetch = require('node-fetch');
const cheerio = require('cheerio');

function getHtml(url, process) {
    process = process || function(data) {
        return data;
    };
    return fetch(url, {
        headers: {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"
        }
    }).then(function(res) {
        return res.text();
    }).then(text => {
        let $ = cheerio.load(text);
        return process($);
    });
}
module.exports = getHtml;