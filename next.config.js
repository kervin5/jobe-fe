const withCSS = require('@zeit/next-css');

module.exports = withCSS({
    webpack: config => {
        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty'
        };

        return config
    },
    cssMOdules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[name]_[local]_[hash:base64:5]"
    }
});


