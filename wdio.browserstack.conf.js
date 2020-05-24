'use strict';

const base = require('./wdio.base.conf');

const { branch = 'unknown' } = require('env-ci')();

exports.config = {
  ...base.config,
  logLevel: 'warn',
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  services: [
    ...base.config.services,
    ['browserstack', {
      browserstackLocal: true,
    }],
  ],
  capabilities: [{
    // IE 11
    'project': `geo-pattern ${branch} (IE 11)`,
    'buildName': `geo-pattern ${branch} (IE 11)`,
    'browserName': 'IE',
    'browser_version': '11.0',
    'resolution': '1024x768',
  }, {
    // Edge 15
    'project': `geo-pattern ${branch} (Edge 15)`,
    'buildName': `geo-pattern ${branch} (Edge 15)`,
    'browserName': 'Edge',
    'browser_version': '15.0',
    'resolution': '1024x768',
    'browserstack.selenium_version' : '4.0.0-alpha-2',
  }, {
    // Edge Latest
    'project': `geo-pattern ${branch} (Edge Latest)`,
    'buildName': `geo-pattern ${branch} (Edge Latest)`,
    'browserName': 'Edge',
    'browser_version': '81.0',
    'resolution': '1024x768',
    'browserstack.use_w3c': 'true',
  }, {
    // Firefox Latest
    'project': `geo-pattern ${branch} (Firefox Latest)`,
    'buildName': `geo-pattern ${branch} (Firefox Latest)`,
    'browserName': 'Firefox',
    'browser_version': '76.0',
    'resolution': '1024x768',
  }, {
    // Chrome Latest
    'project': `geo-pattern ${branch} (Chrome Latest)`,
    'buildName': `geo-pattern ${branch} (Chrome Latest)`,
    'browserName': 'Chrome',
    'browser_version': '81.0',
    'resolution': '1024x768',
    'acceptSslCerts': 'true',
  }, {
    // Mac Safari Latest
    'project': `geo-pattern ${branch} (macOS Safari Latest)`,
    'buildName': `geo-pattern ${branch} (macOS Safari Latest)`,
    'browserName': 'Safari',
    'browser_version': '13.0',
    'resolution': '1024x768',
  }, {
    // iOS Safari Latest
    'project': `geo-pattern ${branch} (iOS Safari Latest)`,
    'buildName': `geo-pattern ${branch} (iOS Safari Latest)`,
    'browserName': 'iPhone',
    'os_version': '13',
    'device': 'iPhone 11 Pro',
    'browserstack.appium_version' : '1.16.0',
    'browserstack.use_w3c': 'true',
    'real_mobile': 'true',
  }, {
    // iPadOS Safari Latest
    'project': `geo-pattern ${branch} (iPadOS Safari Latest)`,
    'buildName': `geo-pattern ${branch} (iPadOS Safari Latest)`,
    'browserName': 'iPad',
    'os_version': '13',
    'device': 'iPad 7th',
    'browserstack.appium_version' : '1.16.0',
    'browserstack.use_w3c': 'true',
    'real_mobile': 'true',
  }, {
    // Android Tab Chrome Latest
    'project': `geo-pattern ${branch} (Android Tab Chrome Latest)`,
    'buildName': `geo-pattern ${branch} (Android Tab Chrome Latest)`,
    'browserName': 'Android',
    'os_version': '9.0',
    'device': 'Samsung Galaxy Tab S6',
    'browserstack.appium_version' : '1.17.0',
    'real_mobile': 'true',
  }, {
    // Android Chrome Latest
    'project': `geo-pattern ${branch} (Android Chrome Latest)`,
    'buildName': `geo-pattern ${branch} (Android Chrome Latest)`,
    'browserName': 'Android',
    'os_version': '10.0',
    'device': 'Samsung Galaxy S20',
    'browserstack.appium_version' : '1.17.0',
    'real_mobile': 'true',
  }],
};
