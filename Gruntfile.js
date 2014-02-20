'use strict';

module.exports = function(grunt) {
  var pages = require('./lib/i18n');

  var read = function(src) {
    return grunt.file.readJSON(src);
  };

  grunt.util._.mixin({
    read: read,
    expand: function(src) {
      return grunt.file.expand(src).map(read);
    }
  });

  // Project configuration.
  grunt.initConfig({

    i18n:     grunt.file.readJSON('data/i18n.json'),
    i18n_alt: grunt.file.readJSON('data/i18n-alt.json'),

    assemble: {
      options: {
        data: 'data/**/*.json',
        partials: 'templates/includes/*.hbs',
        layoutdir: 'templates/layouts',
        layout: 'default.hbs',
        plugins: ['./index.js']
      },
      i18n_1: {
        options: {
          i18n: {
            data: 'data/i18n.json'
          },
          pages: ['index.hbs']
        },
        dest: '_demo/i18n/',
        src: '!*.*'
      },
      i18n_2: {
        options: {
          i18n: {
            data: ['data/i18n.json'],
            patterns: ['**.hbs']
          },
          // Second param for passing file patterns
          pages: ['index.hbs']
        },
        dest: '_demo/i18n/',
        src: '!*.*'
      },
      i18n_3: {
        options: {
          language: 'fr',
          pages: '<%= i18n_alt.languages %>'
        },
        files: {'_demo/i18n-alt/': ['*.hbs']},
      }
    },
    // Before creating new files, remove files from previous build.
    clean: ['_demo/**/*.html']

  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task to be run.
  grunt.registerTask('default', ['clean', 'assemble']);

};
