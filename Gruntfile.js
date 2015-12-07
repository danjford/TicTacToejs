'use strict';

module.exports = function(grunt) {

  var libInfo = grunt.file.readJSON('package.json');

  var version = require('./lib/version.js');

  grunt.loadTasks('lib');

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: libInfo,

    clean: ['dist'],

    uglify: {
      mainBuild: {
        files: {
          'dist/TicTacToe.min.js': ['dist/TicTacToe.js']
        }
      }
    },

    writeVersion: {
      versionJSON: {
        srcFile: JSON.stringify(version),
        variable: 'version',
        dest: 'lib/version.js'
      }
    },


    eslint: {
      options: {
        configFile: 'conf/eslint.json'
      },
      src: ['lib/game.js']
    },

    browserify: {
      dist: {
        files: {
          'dist/TicTacToe.js': ['lib/game.js']
        },
        options: {
          browserifyOptions: {
            standalone: 'RC4'
          },
          transform: [
              ['babelify', {
                presets: ['es2015']
              }]
           ]
        }
      }
    },

    copy: {
      runtime: {
        files: [{
          expand: true,
          cwd: 'node_modules/babel-polyfill/node_modules/babel-regenerator-runtime/',
          src: ['runtime.js'],
          dest: 'lib/'
        }]
      }
    },

    mochaTest: {
      test: {
        src: ['test/**/*.js']
      }
    },

    comments: {
      dist: {
        options: {
            singleline: true,
            multiline: true
        },
        src: [ 'dist/*.js']
      },
    },

    watch: {
      js: {
        files: 'lib/**/*.js',
        tasks: ['eslint', 'browserify', 'comments']
      }
    }

  });

  // Load all of Grunt's dependencies
  require('matchdep')
    .filterDev('grunt-*')
    .forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['clean', 'writeVersion', 'copy', 'eslint', 'comments', 'watch']);

  grunt.registerTask('build', ['clean', 'writeVersion', 'copy', 'eslint', 'comments', 'uglify', 'mochaTest']);



};