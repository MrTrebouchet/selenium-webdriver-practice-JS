const { Options: ChromeOptions } = require('selenium-webdriver/chrome');
const { Options: FirefoxOptions, Profile } = require('selenium-webdriver/firefox');
const { Options: EdgeOptions } = require('selenium-webdriver/edge');

const getChromeOptions = () => {
    const options = new ChromeOptions();
    options.addArguments('--disable-extensions');
    options.addArguments('--disable-popup-blocking');
    options.addArguments('--start-maximized');
    return options;
};

const getFirefoxOptions = () => {
    const options = new FirefoxOptions();
    options.setPreference('network.proxy.type', 0); // disable proxy
    return options;
};

const getEdgeOptions = () => {
    
}

module.exports = {
    getChromeOptions,
    getFirefoxOptions,
    getEdgeOptions
};