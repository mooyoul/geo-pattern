'use strict';

const base = require('./wdio.base.conf');

exports.config = {
  ...base.config,
  logLevel: 'info',
  services: [
    ...base.config.services,
    ['chromedriver'],
  ],
  capabilities: [{
    "browserName": "chrome",
  }],
}
