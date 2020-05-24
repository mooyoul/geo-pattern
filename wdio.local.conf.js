'use strict';

const { isCi } = require('env-ci')();
const base = require('./wdio.base.conf');

const chromeDriverOptions = isCi ? {
  args: [
    '--headless',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--window-size=1024x768',
    '--disable-gpu',
  ],
} : {};

exports.config = {
  ...base.config,
  logLevel: 'info',
  services: [
    ...base.config.services,
    ['chromedriver', chromeDriverOptions],
  ],
  capabilities: [{
    'browserName': 'chrome',
  }],
};
