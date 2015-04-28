module.exports = function(grunt) {

  
  require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    jsDir: 'routes/',
    viewDir: 'routes/views/',
    jsDistDir: 'dist/javascripts/',    
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      js: {
        options: {
          separator: ';'
        },
        src: ['<%=jsDir%>*.js','<%=viewDir%>*.js'],
        dest: '<%=jsDistDir%><%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%=grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          '<%=jsDistDir%><%= pkg.name %>.min.js': ['<%= concat.js.dest %>']
        }
      }
    },
    watch: {
	    files: ['<%=jsDir%>*.js','<%=viewDir%>*.js'],
	    tasks: ['concat', 'uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'concat',
    'uglify',
    'watch'
  ]);

  grunt.registerTask('serve', [
	'concat',
    'uglify',
    'watch',
	'concurrent:dev'
]);

  grunt.registerTask('test', [
    'concat',
    'uglify',
    'watch'
  ]);
  
};