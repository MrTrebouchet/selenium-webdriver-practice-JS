const { Builder } = require('selenium-webdriver');
const { getChromeOptions, getFirefoxOptions, getEdgeOptions } = require('./browsers-configs');


const buildDriver = (browser, options, URL) => {
    let builder = new Builder().forBrowser(browser);

    if (browser === 'chrome') {
        builder = builder.setChromeOptions(getChromeOptions());
    } else if (browser === 'firefox') {
        builder = builder.setFirefoxOptions(getFirefoxOptions());
    }

    return builder.usingServer().build();
};

module.exports = buildDriver;