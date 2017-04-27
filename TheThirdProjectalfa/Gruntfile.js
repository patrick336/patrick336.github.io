
module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files:
        {
          'css/main.css': 'scss/main.scss',
        }
      }
    },
    watch: {
      scripts: {
        files: ['scss/partials/*.scss','scss/modules/*.scss'],
        tasks: ['sass'],
        options: {
          spawn: false,
        },
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,jpeg,gif}'],
          dest: 'images/compressed/'
        }]
      }
    },
    browserSync: {
      default_options: {
        bsFiles: {
          src: [
            "js/**/*.js",
            "css/*.css",
            "*.html"
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "./"
          }
        }
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.css', '!*.min.css'],
          dest: 'css',
          ext: '.min.css'
        }]
      }
    },
    postcss: {
      options: {
        // map: true, // inline

        // browsers: ['last 5 versions', 'ie 8', 'ie 9','iOS 7','Opera','OperaMini','Edge','Android','BlackBerry','Safari','UCAndroid']
        map: {
          inline: false, // save all sourcemaps as separate files...
          annotation: 'dist/css/maps/' // ...to the specified directory
        },

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: ['last 5 versions','ie 8', 'ie 9','iOS 7']}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'css/*.css'
      }
    }
  });

  // Load the plugins tasks
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');


  // Default task(s).

  grunt.registerTask('default', ['sass','postcss','browserSync', 'watch']);
};
