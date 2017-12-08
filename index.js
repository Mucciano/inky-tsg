var Inky = require('inky').Inky;
var cheerio = require('cheerio');
var inlineCss = require('inline-css');

var fs = require('fs');

var email = new Promise(function(resolve, reject) {
        fs.readFile('./src/email.html', 'utf-8', function(err, data) {
            if (err) {
                console.log('reademailhtmlError', err);
                reject(err)
            } else {
                var options = {};
                var i = new Inky(options);

                var html = cheerio.load(data);
                var convertedHtml = i.releaseTheKraken(html);

                resolve(convertedHtml)

            }
        })
}
);

email.then(function(string) {
    var inlinedEmail = new Promise(function (resolve, reject) {
        fs.readFile('./src/email.css', 'utf-8', function (err, data) {
            if (err) {
                console.log('css file read error', err);
                reject()
            } else {
                inlineCss(string, {extraCss: data, url: 'http://example.com/mushroom'}).then(function(html) {
                    resolve(html)
                })

            }
        })
    });
    inlinedEmail.then(function(htmlString) {
        var htmlStream = fs.createWriteStream('build/test.html');
        htmlStream.write(htmlString);
        htmlStream.end();
    })
});





