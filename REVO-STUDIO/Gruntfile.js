module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        sass: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
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
        concat: {
            options: {
              separator: ';',
            },
            dist: {
              src: [ 'js/partials/*.js'],
              dest: 'js/script.js'
            },
        },
        uglify: {
            my_target: {
                files: {
                    'js/script.min.js': ['js/script.js']
                }
            }
        },
        jshint: {
            all:['js/partials/*.js']
        }
    });

    // Load the plugins tasks
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // Default task(s).
    grunt.registerTask('default', ['sass','cssmin','browserSync','watch']);

};
//module.exports = function (grunt) {
//    // Project configuration.
//    grunt.initConfig({
//        sass: {
//            options: {
//                sourceMap: false
//            },
//            dist: {
//                files: {
//                    'css/main.css': 'scss/main.scss',
//                }
//            }
//        },
//        watch: {
//            scripts: {
//                files: ['scss/partials/*.scss','scss/modules/*.scss'],
//                tasks: ['sass'],
//                options: {
//                    spawn: false,
//                },
//            }
//        },
//        browserSync: {
//            default_options: {
//                bsFiles: {
//                    src: [
//                        "js/*.js",
//                        "css/*.css",
//                        "*.html"
//                    ]
//                },
//                options: {
//                    watchTask: true,
//                    server: {
//                        baseDir: "./"
//                    }
//                }
//            }
//        },
//        imagemin: {
//            dynamic: {
//                files: [{
//                    expand: true,
//                    cwd: 'images/',
//                    src: ['**/*.{png,jpg,jpeg,gif}'],
//                    dest: 'images/compressed/'
//                }]
//            }
//        },
//        cssmin: {
//            target: {
//                files: [{
//                    expand: true,
//                    cwd: 'css',
//                    src: ['*.css', '!*.min.css'],
//                    dest: 'css',
//                    ext: '.min.css'
//                    }]
//            }
//        },
//        concat: {
//            options: {
//              separator: ';',
//            },
//            dist: {
//              src: [ 'js/partials/*.js'],
//              dest: 'js/script.js'
//            },
//        },
//        uglify: {
//            my_target: {
//                files: {
//                    'js/script.min.js': ['js/script.js']
//                }
//            }
//        },
//        jshint: {
//            all:['js/partials/*.js']  
//        }
//    });
//
//    // Load the plugins tasks
//    grunt.loadNpmTasks('grunt-sass');
//    grunt.loadNpmTasks('grunt-contrib-imagemin');
//    grunt.loadNpmTasks('grunt-contrib-watch');
//    grunt.loadNpmTasks('grunt-browser-sync');
//    grunt.loadNpmTasks('grunt-contrib-concat');
//    grunt.loadNpmTasks('grunt-contrib-uglify');
//    grunt.loadNpmTasks('grunt-contrib-jshint');
//    grunt.loadNpmTasks('grunt-contrib-cssmin');
//    // Default task(s).
//    grunt.registerTask('default', ['sass','cssmin','jshint','concat','uglify','browserSync','watch']);
//
//};