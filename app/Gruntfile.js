module.exports = function(grunt) {

    // Load tasks
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.initConfig({

        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: './client/scss',
                    src: ['*.scss'],
                    dest: './client/css',
                    ext: '.css'
                }]
            }
        },

        watch: {
            jade: {
                files: 'client/views/**/*.jade',
                tasks: ['jade']
            },
            sass: {
                files: './client/scss/**/*.scss',
                tasks: ['sass']
            }
        },

        jade: {
            compile: {
                options: {
                    client: false,
                    pretty: true
                },
                files: [ {
                    cwd: "client/views",
                    src: "**/*.jade",
                    dest: "client/views",
                    expand: true,
                    ext: ".html"
                } ]
            }
        },

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['server/tests/**/*.js']
            }
        },

        env : {
            options : {
                //Shared Options Hash
            },
            dev : {
                NODE_ENV : 'development'
            },
            test : {
                NODE_ENV : 'test'
            }
        },

        nodemon: {
            dev: {
                script: 'server.js'
            }
        },

        clean: ["node_modules", "client/components"]

    });

    grunt.registerTask('serverTests', ['env:test', 'mochaTest']);
    grunt.registerTask('test', ['env:test', 'serverTests']);
    grunt.registerTask('dev', ['env:dev', 'nodemon']);
    grunt.registerTask('build',['jade']);
    grunt.registerTask('default',['jade','sass','watch']);
};