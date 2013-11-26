/* global module */
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*\n<%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
          '<%= pkg.homepage %>\n' +
          'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.name %>\n*/\n',

    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      script: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['js/*.js', 'js/controller/*.js', 'js/lib/*.js', 'js/model/*.js']
      },
    }
  });


  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);

};
