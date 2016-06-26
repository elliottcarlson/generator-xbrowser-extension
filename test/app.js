import path from 'path';
import assert from 'yeoman-assert';
import helpers from 'yeoman-test';
/*
'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
*/

this.app = helpers.createGenerator('ratchet:app', [
  '../../app', [
    helpers.createDummyGenerator(),
    'mocha:app',
  ],
]);


describe('generator-xbrowser-extension:app', () => {
  before(() => {
    return helpers.run(path.join(__dirname, './generators/app'))
      .withPrompts({someAnswer: true})
      .toPromise();
  });

  it('creates files', () => {
    assert.file([
      'dummyfile.txt',
    ]);
  });
});
