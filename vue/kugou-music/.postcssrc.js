// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    "plugins": [
        // to edit target browsers: use "browserslist" field in package.json
        require('autoprefixer')({
            browsers: ['last 5 versions']
        }), require('./px2rem')({"fontsize":40})
    ]
}
