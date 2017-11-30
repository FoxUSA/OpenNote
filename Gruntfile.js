module.exports = function(grunt) {
    //Initializing the configuration object
    grunt.initConfig({
        compress: {
            main: {
                options: {
                    archive: "build/version.zip"
                },
                files: [{
                    src: ["**/*"],
                    cwd: "OpenNote/",
                    expand: true
                }]
            }
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: "OpenNote",
					keepalive:true
                }
            }
        },
        jshint: {
            options: {},
            all: ["**/*.js*", //Order matters
                "!node_modules/**",
                "!OpenNote/node_moduless/**"
            ]
        },
        //Style
        less: {
            devDark: {
                options: {
                    paths: ["assets/css"],
                    modifyVars: {
                        offset: "#000000"
                    }
                },
                files: {
                    "OpenNote/openNote/style/invert/dark/style.css": "OpenNote/openNote/style/invert/style.less",
                    "OpenNote/openNote/style/invert/dark/alertify.css": "OpenNote/openNote/style/invert/alertify.less"
                }
            },
            devLight: {
                options: {
                    paths: ["assets/css"],
                    modifyVars: {
                        offset: "#FFFFFF"
                    }
                },
                files: {
                    "OpenNote/openNote/style/invert/light/style.css": "OpenNote/openNote/style/invert/style.less",
                    "OpenNote/openNote/style/invert/light/alertify.css": "OpenNote/openNote/style/invert/alertify.less"
                }
            },
            prodDark: {
                options: {
                    paths: ["assets/css"],
                    cleancss: true,
                    modifyVars: {
                        offset: "#000000"
                    }
                },
                files: {
                    "OpenNote/openNote/style/invert/dark/style.css": "OpenNote/openNote/style/invert/style.less",
                    "OpenNote/openNote/style/invert/dark/alertify.css": "OpenNote/openNote/style/invert/alertify.less"
                }
            },
            prodLight: {
                options: {
                    paths: ["assets/css"],
                    cleancss: true,
                    modifyVars: {
                        offset: "#FFFFFF"
                    }
                },
                files: {
                    "OpenNote/openNote/style/invert/light/style.css": "OpenNote/openNote/style/invert/style.less",
                    "OpenNote/openNote/style/invert/light/alertify.css": "OpenNote/openNote/style/invert/alertify.less"
                }
            }
        },
        //Testing setup
        karma: {
            unit: {
                configFile: "OpenNote.Test/karma.conf.js",
                background: true
            },
            travis: {
                configFile: "OpenNote.Test/karma.conf.js",
                singleRun: true,
                browsers: ["PhantomJS"] //Override config browsers
            }
        },
        watch: {
            karma: {
                files: ["src/**/*.js", "test/unit/**/*.js"],
                tasks: ["karma:unit:run"]
            }
        },
        shell: {
            npmInstall: {
                command: ["cd OpenNote",
                    "npm install"
                ].join("&&")
            },
            clean: {
                command: ["rm -rf build",
                    "cd OpenNote",
                    "rm -rf node_moduless",
                    "cd openNote/style/invert/",
                    "rm -rf dark light"
                ].join("&&")
            }
        },
        //HTML 5
        manifest: {
            generate: {
                options: {
                    basePath: "OpenNote/",
                    exclude: ["openNote.appcache", "Service"],
                    verbose: true,
                    timestamp: true,
                    hash: true,
                    master: ["index.html"]
                },
                src: [
                    "**/*.js",
                    "**/*.css",
                    "**/*.html",
                    "**/*.png",
                    "**/*.jpg"
                ],
                dest: "OpenNote/openNote.appcache"
            }
        }
    });

    //Plugin loading
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-less");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-karma");
    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks("grunt-manifest");
    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks("grunt-contrib-connect");

    //Task definition
    //css
    grunt.registerTask("buildDevCSS", ["less:devDark", "less:devLight"]);
    grunt.registerTask("buildProdCSS", ["less:prodDark", "less:prodLight"]);

    //deployment
    // you can run individual command using  the plug-in command syntax suck as manifest:generate or shell:clean
    grunt.registerTask("build", ["shell:npmInstall", "buildDevCSS", "manifest:generate"]);
    grunt.registerTask("default", ["build", "connect:server"]);
    grunt.registerTask("deploy", ["shell:clean", "shell:npmInstall", "buildProdCSS", "manifest:generate", "compress"]);

    //testing
    grunt.registerTask("devmode", ["karma:unit", "watch"]);
    grunt.registerTask("test", ["karma:travis"]);
    grunt.registerTask("ci", ["build", "jshint:all", "karma:travis"]);
};
