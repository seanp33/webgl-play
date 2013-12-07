module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    keepalive: true,
                    port: 9000,
                    base: 'dist'
                }
            }
        },

        clean: {
            dist: ['dist/']
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: '*.htm*',
                        dest: 'dist/'
                    },
                    {
                        expand: true,
                        cwd: 'src/assets/',
                        src: '**',
                        dest: 'dist/assets'
                    },
                    {
                        expand: true,
                        cwd: 'src/js',
                        src: '**',
                        dest: 'dist/js'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/d3/',
                        src: 'd3.js',
                        dest: 'dist/js/lib/d3/'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/requirejs',
                        src: 'require.js',
                        dest: 'dist/js/lib/requirejs/'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/domready',
                        src: 'ready.js',
                        dest: 'dist/js/lib/requirejs/'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/lodash/dist',
                        src: 'lodash.js',
                        dest: 'dist/js/lib/lodash/'
                    },
                    {
                        expand: true,
                        cwd: 'node_modules/signals/dist',
                        src: 'signals.js',
                        dest: 'dist/js/lib/signals/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', ['clean:dist', 'copy:dist']);
    grunt.registerTask('dist', ['clean:dist', 'copy:dist']);

}
;
