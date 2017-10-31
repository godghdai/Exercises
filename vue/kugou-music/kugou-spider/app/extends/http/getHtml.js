const fetch = require('node-fetch');
const cheerio = require('cheerio');

function getHtml(url, process) {
  process = process || function (data) {
    return data;
  };
  return fetch(url).then(function (res) {
    return res.text();
  }).then(text => {
    console.log(text);
    let $ = cheerio.load(text);
    return process($);
  });
}
module.exports = getHtml;
//# sourceMappingURL=getHtml.js.map