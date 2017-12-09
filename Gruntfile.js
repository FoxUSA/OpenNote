module.exports = function(grunt) {
    //Initializing the configuration object
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: ".",
                    keepalive: true
                }
            }
        },
        compress: {
            main: {
                options: {
                    archive: "dist/version.zip"
                },
                files: [{
                    src: ["**/*"], //TODO just include needed files
                    expand: true
                }]
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
                    "openNote/style/invert/dark/style.css": "openNote/style/invert/style.less",
                    "openNote/style/invert/dark/alertify.css": "openNote/style/invert/alertify.less"
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
                    "openNote/style/invert/light/style.css": "openNote/style/invert/style.less",
                    "openNote/style/invert/light/alertify.css": "openNote/style/invert/alertify.less"
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
                    "openNote/style/invert/dark/style.css": "openNote/style/invert/style.less",
                    "openNote/style/invert/dark/alertify.css": "openNote/style/invert/alertify.less"
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
                    "openNote/style/invert/light/style.css": "openNote/style/invert/style.less",
                    "openNote/style/invert/light/alertify.css": "openNote/style/invert/alertify.less"
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

            clean: {
                command: ["rm -rf dist",
                    "cd openNote/style/invert/",
                    "rm -rf dark light"
                ].join("&&")
            },
            dev: {
                command: ["npm run dev"].join("&&")
            },
            build: {
                command: ["npm run build"].join("&&")
            }
        },
        //HTML 5
        manifest: {
            generate: {
                options: {
                    basePath: ".",
                    exclude: ["openNote.appcache"],
                    verbose: true,
                    timestamp: true,
                    hash: true,
                    master: ["index.html"]
                },
                src: [
                    "openNote.bundle.js",
                    "node_modules/bootstrap/dist/**/*.*",
                    "node_modules/codemirror/**/*.css",
                    "node_modules/alertify/**/*.css",
                    "openNote/**/*.*",
                    "!**/*.js", // JS Files handled webpack
                    "!**/*.less"
                ],
                dest: "openNote.appcache"
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
    grunt.registerTask("build", ["buildDevCSS", "shell:build", "manifest:generate"]);
    grunt.registerTask("buildProd", ["buildProdCSS", "shell:build", "manifest:generate"]);
    grunt.registerTask("default", ["build", "shell:dev"]);
    grunt.registerTask("deploy", ["shell:clean", "buildProd", "compress"]);
    grunt.registerTask("testDeploy", ["shell:clean", "buildProd", "connect:server"]);

    //testing
    grunt.registerTask("devmode", ["karma:unit", "watch"]);
    grunt.registerTask("test", ["karma:travis"]);
    grunt.registerTask("ci", ["build", "jshint:all"]); //TODO , "karma:travis"
};
