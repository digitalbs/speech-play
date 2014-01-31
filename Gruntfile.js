/*global require:false*/
module.exports = function (grunt) {
    "use strict";

    var merge = require('deepmerge');

    var plugins = [
        'grunt-confidence',
        'grunt-bower-task',
        'grunt-contrib-concat',
        'grunt-contrib-cssmin',
        'grunt-contrib-uglify',
        'grunt-contrib-copy',
        'grunt-sass',
        'grunt-contrib-clean',
        'grunt-contrib-watch',
        'grunt-contrib-requirejs',
        'grunt-karma',
        'grunt-angular-templates',
        'grunt-contrib-connect',
        'grunt-open',
        'grunt-retire',
        'grunt-exec',
        'grunt-contrib-yuidoc',
        'grunt-install-dependencies',
        'grunt-concurrent',
        'grunt-i18n',
        'grunt-exec'
    ];
    var gruntConfig = {
        pkg: grunt.file.readJSON('package.json'),
        dirs: {
            config: 'config',
            configpartials: 'config/templates/partials',
            exports: 'exports',
            source: 'src',
            i18n: 'src/i18n',
            csssource: 'src/css/sass',
            cssexports: 'src/css/stylesheets'
        },
        bower: {
            install: {
                options: {
                    targetDir: "./src/vendor",
                    cleanup: true,
                    layout: "byComponent"
                }
            }
        },
        clean: {
            options: {
                force: true
            },
            build: '<%= dirs.exports %>/*'
        },
        copy: {
            removeTemplateCache: {
                src: '<%= dirs.config %>/templates/templates.nocache.js',
                dest: '<%= dirs.source %>/app/templates.js'
            }
        },
        confidence: {
            karmaDev: {
                files: {
                    '<%= dirs.config %>/karma/karma.configwrapper.js': '<%= dirs.config %>/karma.conf.json'
                },
                options: {
                    criteria: {
                        target: "development"
                    },
                    amd: false,
                    commonJS: true
                }
            },
            mainRequireTestConfig: {
                files: {
                    '<%= dirs.config %>/tmp/main-test.config.json': '<%= dirs.config %>/require.config.json'
                },
                options: {
                    criteria: {
                        target: "testing"
                    },
                    amd: false
                }
            },
            mainRequireDemoConfig: {
                files: {
                    '<%= dirs.config %>/tmp/main-demo.config.json': '<%= dirs.config %>/require.config.json'
                },
                options: {
                    criteria: {
                        target: "demo"
                    },
                    amd: false
                }
            },
            mainRequireProdConfig: {
                files: {
                    '<%= dirs.config %>/build/main-prod.config.js': '<%= dirs.config %>/require.config.json'
                },
                options: {
                    criteria: {
                        target: "production"
                    },
                    amd: false,
                    commonJS: true
                }
            },
            prodAppConfig: {
                files: {
                    '<%= dirs.source %>/app/config.js': '<%= dirs.config %>/app.config.json'
                },
                options: {
                    criteria: {
                        env: "production"
                    },
                    amd: true
                }
            },
            nonProdAppConfig: {
                files: {
                    '<%= dirs.source %>/app/config.js': '<%= dirs.config %>/app.config.json'
                },
                options: {
                    criteria: {
                        env: "nonproduction"
                    },
                    amd: true
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            css: {
                files: ['<%= dirs.cssexports %>/app.css'],
                tasks: []
            },
            sass: {
                files: ['<%= dirs.csssource %>/**/*.scss'],
                tasks: ["sass:dist"]
            },
            confidence: {
                files: ['<%= dirs.config %>/*.json'],
                tasks: ["confidence"]
            },
            html: {
                files: ['<%= dirs.source %>/**/*.html']
            }
        },
        sass: {
            dist: {
                options: {
                    includePaths: require('node-bourbon').includePaths.concat(require('node-neat').includePaths).concat(['src/vendor/sass-bootstrap/scss'])
                },
                files: {
                    '<%= dirs.cssexports %>/app.css': '<%= dirs.csssource %>/app.scss'
                }
            }
        },

        karma: {
            watch: {
                configFile: 'karma.conf.js',
                runnerPort: 9876,
                autoWatch: true
            }
        },
        concurrent: {
            dev: {
                tasks: [ "watch", "connect:server", "karma:watch" ],
                options: {
                    limit: 4,
                    logConcurrentOutput: true
                }
            }
        },
        ngtemplates: {
            dist: {
                options: {
                    base: 'src/',
                    prepend: '',
                    module: 'speechApi.templates',
                    bootstrap: function (module, script) {
                        return 'define([], function() { return function($templateCache){ ' + script + ' }; });';
                    }
                },
                src: ['src/app/templates/**/*.html', 'src/app/views/**/*.html'],
                dest: 'src/app/templates.js'
            }
        },
        connect: {
            server: {
                options: {
                    port: 8000,
                    base: './',
                    keepalive: true
                }
            }
        },
        concat: {
            testRequireConfig: {
                options: {
                    banner: "//This file is auto-generated, do not edit\n"
                },
                src: ["<%= dirs.configpartials %>/main.test.header.js",
                    "<%= dirs.config %>/tmp/main-test.config.json",
                    "<%= dirs.configpartials %>/main.test.footer.js"
                ],
                dest: "<%= dirs.source %>/main-test.js"
            },
            prodRequireConfig: {
                options: {
                    banner: "//This file is auto-generated, do not edit\n"
                },
                src: ["<%= dirs.configpartials %>/main.prod.header.js",
                    "<%= dirs.configpartials %>/main.footer.js"
                ],
                dest: "<%= dirs.source %>/main-prod.js"
            },
            demoRequireConfig: {
                options: {
                    banner: "//This file is auto-generated, do not edit\n"
                },
                src: ["<%= dirs.configpartials %>/main.header.js", "<%= dirs.config %>/tmp/main-demo.config.json",
                    "<%= dirs.configpartials %>/main.footer.js"
                ],
                dest: "<%= dirs.source %>/main-demo.js"
            }
        },
        requirejs: {
            deploy: {
                options: merge(require("./config/build/main-prod.config.js"), {
                    baseUrl: "src/",
                    name: "main-prod",
                    out: "exports/app.js",
                    include: "vendor/requirejs/js/require",
                    optimize: "none",
                    paths: {
                        "angular-locale": "vendor/code.angularjs.org/js/angular-locale_en-us"
                    }
                })
            },
            deployMin: {
                options: merge(require("./config/build/main-prod.config.js"), {
                    baseUrl: "src/",
                    name: "main-prod",
                    out: "exports/app.min.js",
                    include: "vendor/requirejs/js/require",
                    optimize: "uglify",
                    paths: {
                        "angular-locale": "vendor/code.angularjs.org/js/angular-locale_en-us"
                    }
                })
            }
        },
        retire: {
            js: [
                "<%= dirs.source %>/app/*.js",
                "<%= dirs.source %>/app/**/*.js",
                "<%= dirs.source %>/vendor/**/*.js"
            ]
        },
        yuidoc: {
            compile: {
                name: 'generator-labseed',
                description: 'Agility Labs Seed',
                version: '0.0.0',
                options: {
                    paths: 'src/app/',
                    outdir: 'docs/'
                }
            }
        }
    };


    grunt.initConfig(gruntConfig);

    //load in all grunt plugins added in the array at the top of the config
    for (var i = 0; i < plugins.length; i++) {
        grunt.loadNpmTasks(plugins[i]);
    }

    /**
     *  Default task
     *
     **/


    grunt.registerTask('default', ['develop']);

    /**
     *  The main grunt tasks for bootstrapping the app
     *
     **/

    grunt.registerTask('develop', [
        'sass',
        'copy:removeTemplateCache',
        'buildTestRequireConfig',
        'confidence:nonProdAppConfig',
        'confidence:karmaDev',
        'buildDevRequireConfig',
        'concurrent:dev'
    ]);

    grunt.registerTask('deploy', ['confidence:prodAppConfig', 'buildProdRequireConfig', 'ngtemplates:dist',
        'requirejs:deploy',
        'requirejs:deployMin'
    ]);

    grunt.registerTask('buildTestRequireConfig', ['confidence:mainRequireTestConfig', 'concat:testRequireConfig']);
    grunt.registerTask('buildProdRequireConfig', ['confidence:mainRequireProdConfig', 'concat:prodRequireConfig']);
    grunt.registerTask('buildDevRequireConfig', ['confidence:mainRequireDemoConfig', 'concat:demoRequireConfig']);

};
