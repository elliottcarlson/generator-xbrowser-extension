#!/usr/bin/env node

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XBrowserExtension = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _yeomanGenerator = require('yeoman-generator');

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _shelljs = require('shelljs');

var _shelljs2 = _interopRequireDefault(_shelljs);

var _changeCase = require('change-case');

var _changeCase2 = _interopRequireDefault(_changeCase);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ora = require('ora');

var _ora2 = _interopRequireDefault(_ora);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A green checkmark.
 */
var check = _chalk2.default.green('✔︎');

/**
 * A red x-mark.
 */
var xmark = _chalk2.default.red('𝗫');

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

var XBrowserExtension = exports.XBrowserExtension = function (_yeoman$Base) {
  _inherits(XBrowserExtension, _yeoman$Base);

  function XBrowserExtension() {
    var _Object$getPrototypeO;

    _classCallCheck(this, XBrowserExtension);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(XBrowserExtension)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this.spinner = (0, _ora2.default)('starting');

    _this.supportedBrowsers = [{
      name: 'Chrome',
      checked: true
    }, {
      name: 'Firefox',
      checked: true
    }, {
      name: 'Opera',
      checked: true
    }, {
      name: 'Safari',
      checked: true
    }];

    _this.npmDependencies = ['axios', 'normalize.css', 'react', 'react-dom'];

    _this.npmDevDependencies = ['autoprefixer', 'babel', 'babel-cli', 'babel-core', 'babel-eslint', 'babel-loader', 'babel-plugin-typecheck', 'babel-preset-es2015', 'babel-preset-react', 'babel-preset-react-hmre', 'babel-preset-stage-0', 'babel-register', 'body-parser', 'css-loader', 'eslint', 'eslint-plugin-babel', 'eslint-plugin-react', 'express', 'jade', 'node-sass', 'postcss-loader', 'react-addons-test-utils', 'redux-devtools', 'sass-loader', 'sleep', 'style-loader', 'webpack', 'webpack-dev-middleware', 'webpack-hot-middleware', 'chai', 'jsdom', 'mocha', 'mocha-jsdom', 'sinon'];

    _this.say = {
      arr: '----> ',
      tab: '      ',
      info: function info(msg) {
        console.log('\n\n' + _chalk2.default.yellow(this.arr + msg) + '\n');
      },
      status: function status(item, _status) {
        console.log('' + this.tab + _chalk2.default.green(_status) + ' ' + item);
      },
      cmd: function cmd(_cmd) {
        console.log('\n' + _chalk2.default.green('$' + _cmd));
      },
      done: function done(status, msg) {
        console.log('\n\n' + this.tab + _chalk2.default.green(status) + ' $ ' + msg + '\n');
      }
    };

    _this.getDeps = function (deps) {
      return deps.map(function (dep) {
        return dep + '@latest';
      });
    };

    _this.copy = function (src, dest, show) {
      _shelljs2.default.cp('-Rf', this.templatePath(src), this.destinationPath(dest));
      this.say.status(show || dest, '✓ ');
    };

    _this.render = function (src, dest) {
      var params = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      var output = _ejs2.default.render(this.read(this.templatePath(src)), params);
      _fs2.default.writeFileSync(this.destinationPath(dest), output);
      this.say.status(dest, '✓ ');
    };

    _this.shellExec = function (cmd) {
      this.say.cmd(cmd);
      _shelljs2.default.exec(cmd);
      console.log('Completed.');
    };

    _this.allDone = function () {
      this.say.done('All done!', 'cd ' + this.appName + '/ && npm start');
    };

    return _this;
  }

  /**
   * Initialize the yeoman generator
   */


  _createClass(XBrowserExtension, [{
    key: 'initializing',
    value: function initializing() {
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

      this.appName = _changeCase2.default.param('Synopsis');
    }
  }, {
    key: 'prompting',
    value: function prompting() {
      var cb = this.async();

      var isChecked = function isChecked(choices, value) {
        return choices.indexOf(value) > -1;
      };

      var defaultAppName = _changeCase2.default.param(this.options.argv.original[0]) || null;

      var prompts = [{
        type: 'input',
        name: 'appName',
        message: 'Extension name:',
        default: defaultAppName
      }, {
        type: 'checkbox',
        name: 'browsers',
        message: 'What browsers do you want to support?',
        choices: this.supportedBrowsers,
        validate: function validate(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one browser to support.';
          }
          return true;
        }
      }];

      this.prompt(prompts, function (props) {
        //this.appName = shift.param(props.appName);
        //this.browsers = props.browsers;

        //this.log('IDK????');
        cb();
      });
    }
  }, {
    key: 'copyFiles',
    value: function copyFiles() {
      this.spinner.text = 'Copying files...';
      this.spinner.start();

      this.log('');
      _shelljs2.default.mkdir(this.appName);
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

  }, {
    key: 'end',
    value: function end() {
      this.spinner.stop();

      this.log('All done!');
      this.log('');
    }
  }]);

  return XBrowserExtension;
}(_yeomanGenerator2.default.Base);

module.exports = XBrowserExtension;
