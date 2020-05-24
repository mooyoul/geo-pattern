'use strict';

require('ts-node/register');

const PORT = 8080;

exports.config = {
  baseUrl: `http://127.0.0.1:${PORT}`,
  maxInstances: 4,
  logLevel: 'warn',
  bail: 1,
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: [
    ['static-server', {
      folders: [
        { mount: '/', path: __dirname },
      ],
      port: PORT,
    }],
  ],
  framework: 'mocha',
  reporters: ['spec'],
  specs: [
    './integration-test/browser/**/*.ts'
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 90000,
    bail: true,
    require: [
      'ts-node/register',
    ]
  },
};
