/* global module:false */
module.exports = function(grunt) {

    // grunt.initConfig({
    //     pkg: grunt.file.readJSON('package.json'),
    //     banner: '/*\n<%= pkg.name %> - v<%= pkg.version %> - ' +
    //           '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
    //           '<%= pkg.homepage %>\n' +
    //           'Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.name %>\n*/\n',
    // });

    require('./config/lineman').config.grunt.run(grunt);

};
