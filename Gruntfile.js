module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),
        concat: {
            css: {
                src: ['src/css/*.scss'],
                dest: '_temp/css/main.scss'
            }
        },
        uglify: {
            everything: {
                files: {
                    'build/js/main.min.js': ['src/js/*.js']
                },
                options: {
                    sourceMap: true
                }
            }
        },
        watch: {
            everything: {
                files: ['src/**/*'],
                tasks: ['concat', 'uglify', 'sass', 'htmlmin']
            }
        },
        sass: {
            dist: {
                files: {
                    'build/css/main.css': '_temp/css/main.scss'
                },
                options: {
                    style: 'compressed'
                }
            }
        },
        copy: {
            images: {
                expand: true,
                cwd: 'src/images',
                src: '*',
                dest: 'build/images/',
            }
        },
        htmlmin: { // Task 
            dist: { // Target 
                options: { // Target options 
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: { // Dictionary of files 
                    'build/index.html': 'src/index.html' // 'destination': 'source' 
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: 'localhost',
                    base: {
                        path: 'build',
                        options: {
                            index: 'index.html',
                            maxAge: 300000
                        }
                    },
                    livereload: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask("default", ['concat', 'uglify', 'sass', 'htmlmin', 'copy', 'connect', 'watch']);
}