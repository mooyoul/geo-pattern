'use strict';

const { isCi } = require('env-ci')();
const base = require('./wdio.base.conf');

const { chromeDriverOptions, chromeOptions } = isCi ? {
  chromeDriverOptions: {
    outputDir: 'output/chromedriver/',
  },
  chromeOptions: {
    args: [
      '--headless',
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=1024x768',
      '--disable-gpu',
    ],
  }
} : {
  chromeDriverOptions: {},
  chromeOptions: {},
};

exports.config = {
  ...base.config,
  logLevel: 'info',
  services: [
    ...base.config.services,
    ['chromedriver', chromeDriverOptions],
  ],
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': chromeOptions,
  }],
};
