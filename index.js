'use strict';
var generators = require('yeoman-generator');
var _ = require('lodash');

var gulpfileGenerator = module.exports = generators.Base.extend({
  initializing: function () {
    this.vars = {};
  },

  prompting: function () {
    var self = this;
    var done = self.async();

    self.prompt([{
      type: 'value',
      name: 'src',
      message: 'What is the relative path to your angular application (ngAnnotate)?',
      default: './app'
    }, {
      type: 'value',
      name: 'dist',
      message: 'What is the relative path to your angular application ready for production (ngAnnotate)?',
      default: './dist'
    }], function (answers) {
      _.assign(self.vars, answers);
      done();
    });
  },

  writing: function () {
    var self = this;
    self.template(self.templatePath(), self.destinationPath('./gulp-scripts'), self.vars);
  },

  install: function () {
    var self = this;

    self.installDependencies();
    self.npmInstall(['gulp-ng-annotate'], { 'saveDev': true });
  },

  end: function () {

  }
});
