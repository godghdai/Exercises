'use strict';

module.exports = function(grunt) {
    /*
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-stylus');*/

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var config = {
        app: 'src',
        dist: 'dist'
    }

    grunt.initConfig({
        config: config,
        watch: {
            css: {
                files: ['src/stylus/*.styl', 'src/less/*.less'],
                tasks: ['stylus', 'less:dev'],
                options: {
                    spawn: false,
                    livereload: true
                }
            },
            configFiles: {
                files: ['Gruntfile.js', 'config/*.js'],
                options: {
                    reload: true
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        stylus: {
            compile: {
                options: {
                    compress: false,
                    use: [
                        require('nib')
                    ],
                    import: ['nib']
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/stylus',
                    src: ['**/*.styl'],
                    dest: '<%= config.dist %>/stylus',
                    ext: '.css'
                }]
            }
        },
        less: {
            dev: {
                options: {
                    paths: ['<%= config.app %>/less'],
                    plugins: [
                        new(require('less-plugin-autoprefix'))({ browsers: ["Android >= 2.1", "iOS >= 4", "ie >= 8", "firefox >= 15"] })
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/less',
                    src: ['**/*.less'],
                    dest: '<%= config.dist %>/less',
                    ext: '.css'
                }]
            },
            pro: {
                options: {
                    paths: ['<%= config.app %>/less'],
                    plugins: [
                        new(require('less-plugin-autoprefix'))({ browsers: ["> 1%", "last 5 versions"] }),
                        new(require('less-plugin-clean-css'))({
                            /*
                            CleanCSS constructor accepts a hash as a parameter, i.e., new CleanCSS(options) with the following options available:
                            advanced - set to false to disable advanced optimizations - selector & property merging, reduction, etc.
                            aggressiveMerging - set to false to disable aggressive merging of properties.
                            benchmark - turns on benchmarking mode measuring time spent on cleaning up (run npm run bench to see example)
                            compatibility - enables compatibility mode, see below for more examples
                            debug - set to true to get minification statistics under stats property (see test/custom-test.js for examples)
                            inliner - a hash of options for @import inliner, see test/protocol-imports-test.js for examples
                            keepBreaks - whether to keep line breaks (default is false)
                            keepSpecialComments - * for keeping all (default), 1 for keeping first one only, 0 for removing all
                            processImport - whether to process @import rules
                            rebase - set to false to skip URL rebasing
                            relativeTo - path to resolve relative @import rules and URLs
                            root - path to resolve absolute @import rules and rebase relative URLs
                            roundingPrecision - rounding precision; defaults to 2; -1 disables rounding
                            shorthandCompacting - set to false to skip shorthand compacting (default is true unless sourceMap is set when it's false)
                            sourceMap - exposes source map under sourceMap property, e.g. new CleanCSS().minify(source).sourceMap (default is false) If input styles are a product of CSS preprocessor (LESS, SASS) an input source map can be passed as a string.
                            target - path to a folder or an output file to which rebase all URLs*/
                            "advanced": true,
                            "debug": true
                        })
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/less',
                    src: ['**/*.less'],
                    dest: '<%= config.dist %>/less',
                    ext: '.css'
                }]
            }
        },
        postcss: {
            options: {
                map: true, // inline sourcemaps
                map: {
                    inline: false, // save all sourcemaps as separate files...
                    annotation: 'dist/css/maps/' // ...to the specified directory
                },
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({ browsers: 'last 2 versions' }), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        }

    });

    grunt.registerTask('default', ['watch']);

    grunt.event.on('watch', function(action, filepath, target) {
        grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
    });

};