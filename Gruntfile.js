module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),
        concat: {
            js: {
                src: ['src/js/*.js'],
                dest: 'build/js/main.js'
            }//,
            // css: {
            //     src: ['src/css/grapher.scss'],
            //     dest: 'build/css/main.css'
            // }
        },
        watch: {
            everything: {
                files: ['src/**/*'],
                tasks: ['concat']
            }
        },
        sass: {
            dist: {
                files: {
                    'build/css/main.css': 'src/css/*.scss'
                },
                options: {
                    style: 'compressed'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask("default", ['concat', 'sass']);
}