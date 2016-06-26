#!/usr/bin/env node
'use strict'

import yeoman from 'yeoman-generator';
import ejs    from 'ejs';
import chalk  from 'chalk';
import shell  from 'shelljs';
import shift  from 'change-case';
import fs     from 'fs';
import ora    from 'ora';

/**
 * A green checkmark.
 */
const check = chalk.green('✔︎');

/**
 * A red x-mark.
 */
const xmark = chalk.red('𝗫');

/**
 * Yeoman generator to install the XBrowser Extension generator.
 *
 * Methods are executed from top-to-bottom; methods starting with an _ are not
 * automatically run.
 *
 * Functions like `initializing` and `end` are reserved lifecycle methods.
 *
 * If you want to ensure your task finishes before starting the next one, return
 * a promise, or call `const done = this.async()` before and `done()` once the
 * task is finished.
 */
export class XBrowserExtension extends yeoman.Base {

  constructor(...args) {

    super(...args);

    this.spinner = ora('starting');

    this.supportedBrowsers = [
      {
        name: 'Chrome',
        checked: true,
      },
      {
        name: 'Firefox',
        checked: true,
      },
      {
        name: 'Opera',
        checked: true,
      },
      {
        name: 'Safari',
        checked: true,
      },
    ];

    this.npmDependencies = [
      'axios',
      'normalize.css',
      'react',
      'react-dom',
    ];

    this.npmDevDependencies = [
      'autoprefixer',
      'babel',
      'babel-cli',
      'babel-core',
      'babel-eslint',
      'babel-loader',
      'babel-plugin-typecheck',
      'babel-preset-es2015',
      'babel-preset-react',
      'babel-preset-react-hmre',
      'babel-preset-stage-0',
      'babel-register',
      'body-parser',
      'css-loader',
      'eslint',
      'eslint-plugin-babel',
      'eslint-plugin-react',
      'express',
      'jade',
      'node-sass',
      'postcss-loader',
      'react-addons-test-utils',
      'redux-devtools',
      'sass-loader',
      'sleep',
      'style-loader',
      'webpack',
      'webpack-dev-middleware',
      'webpack-hot-middleware',

      'chai',
      'jsdom',
      'mocha',
      'mocha-jsdom',
      'sinon',
    ];

    this.say = {
      arr: '----> ',
      tab: '      ',
      info(msg) {
        console.log('\n\n' + chalk.yellow(this.arr + msg) + '\n');
      },
      status(item, status) {
        console.log(`${this.tab}${chalk.green(status)} ${item}`);
      },
      cmd(cmd) {
        console.log('\n' + chalk.green('$' + cmd));
      },
      done(status, msg) {
        console.log(`\n\n${this.tab}${chalk.green(status)} $ ${msg}\n`);
      },
    };

    this.getDeps = deps => deps.map(dep => dep + '@latest');

    this.copy = function(src, dest, show) {
      shell.cp('-Rf', this.templatePath(src), this.destinationPath(dest));
      this.say.status(show || dest, '✓ ');
    };

    this.render = function(src, dest, params = {}) {
      const output = ejs.render(this.read(this.templatePath(src)), params);
      fs.writeFileSync(this.destinationPath(dest), output);
      this.say.status(dest, '✓ ');
    };

    this.shellExec = function(cmd) {
      this.say.cmd(cmd);
      shell.exec(cmd);
      console.log('Completed.');
    };

    this.allDone = function() {
      this.say.done('All done!', `cd ${this.appName}/ && npm start`);
    };

  }

  /**
   * Initialize the yeoman generator
   */
  initializing () {
    this.log('---------------------------------------');
    this.log('   _  _____');
    this.log('  | |/_/ _ )_______ _    _____ ___ ____');
    this.log(' _>  </ _  / __/ _ \\ |/|/ (_-</ -_) __/');
    this.log('/_/|_/____/_/_ \\___/__,__/___/\\__/_/');
    this.log('  / __/_ __/ /____ ___  ___ (_)__  ___');
    this.log(' / _/ \\ \\ / __/ -_) _ \\(_-</ / _ \\/ _ \\');
    this.log('/___//_\\_\\\\__/\\__/_//_/___/_/\\___/_//_/');
    this.log('');
    this.log('---------------------------------------');
    this.log('');

    this.appName = shift.param('Synopsis');
  }

  prompting () {
    const cb = this.async();

    let isChecked = (choices, value) => {
      return choices.indexOf(value) > -1;
    };

    let defaultAppName = shift.param(this.options.argv.original[0]) || null;

    let prompts = [{
      type   : 'input',
      name   : 'appName',
      message: 'Extension name:',
      default: defaultAppName,
    },
    {
      type   : 'checkbox',
      name   : 'browsers',
      message: 'What browsers do you want to support?',
      choices: this.supportedBrowsers,
      validate: (answer) => {
        if (answer.length < 1) {
          return 'You must choose at least one browser to support.';
        }
        return true;
      }
    }];

    this.prompt(prompts, props => {
      //this.appName = shift.param(props.appName);
      //this.browsers = props.browsers;

      //this.log('IDK????');
      cb();
    });
  }

  copyFiles () {
    this.spinner.text = 'Copying files...';
    this.spinner.start();

    this.log('');
    shell.mkdir(this.appName);
    this.destinationRoot(this.appName);
    this.copy('app/', 'app/');
    this.copy('config/', 'config/');
    this.copy('dev/', 'dev/');
    this.copy('.babelrc', '.', '.babelrc');
    this.copy('.editorconfig', '.', '.editorconfig');
    this.copy('.eslintignore', '.', '.eslintignore');
    this.copy('.eslintrc', '.', '.eslintrc');
    this.copy('.scss-lint.yml', '.', '.scss-lint.yml');
    this.render('_package.json', 'package.json', { appName: this.appName });
    this.copy('server.js', '.', 'server.js');

    this.spinner.stop();
  }
/*
  install () {

    const deps    = this.getDeps(this.npmDependencies);
    const devDeps = this.getDeps(this.npmDevDependencies);

    this.spinner.start();
    this.spinner.text = 'Installing dependencies...';

    const done = this.async();

    this.npmInstall(deps, { save: true });
    this.npmInstall(devDeps, { saveDev: true }, () => {
      this.shellExec('npm shrinkwrap --loglevel error');
      this.done();
    });
  }
*/
  end () {
    this.spinner.stop()

    this.log('All done!');
    this.log('');
  }
}

module.exports = XBrowserExtension;
