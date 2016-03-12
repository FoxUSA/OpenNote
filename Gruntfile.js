module.exports = function(grunt) {
	//Initializing the configuration object
	    grunt.initConfig({
			jshint: {
				options:{
				},
				all: [	"**/*.js*",//Order matters
						"!node_modules/**",
						"!OpenNote/bower_components/**"]
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
					    	"OpenNote/openNote/style/invert/dark/note.css": "OpenNote/openNote/style/invert/note.less",
					    	"OpenNote/openNote/style/invert/dark/alertify.css": "OpenNote/openNote/style/invert/alertify.less",
					    	"OpenNote/openNote/style/invert/dark/intojs.css": "OpenNote/openNote/style/invert/introjs.less",

					    	"OpenNote/openNote/style/simplicity/dark/style.css": "OpenNote/openNote/style/simplicity/style.less",
					    	"OpenNote/openNote/style/simplicity/dark/note.css": "OpenNote/openNote/style/simplicity/note.less",
					    	"OpenNote/openNote/style/simplicity/dark/alertify.css": "OpenNote/openNote/style/simplicity/alertify.less",
					    	"OpenNote/openNote/style/simplicity/dark/intojs.css": "OpenNote/openNote/style/simplicity/introjs.less"

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
					    	"OpenNote/openNote/style/invert/light/note.css": "OpenNote/openNote/style/invert/note.less",
					    	"OpenNote/openNote/style/invert/light/alertify.css": "OpenNote/openNote/style/invert/alertify.less",
					    	"OpenNote/openNote/style/invert/light/intojs.css": "OpenNote/openNote/style/invert/introjs.less",

					    	"OpenNote/openNote/style/simplicity/light/style.css": "OpenNote/openNote/style/simplicity/style.less",
					    	"OpenNote/openNote/style/simplicity/light/note.css": "OpenNote/openNote/style/simplicity/note.less",
					    	"OpenNote/openNote/style/simplicity/light/alertify.css": "OpenNote/openNote/style/simplicity/alertify.less",
					    	"OpenNote/openNote/style/simplicity/light/intojs.css": "OpenNote/openNote/style/simplicity/introjs.less"
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
					    	"OpenNote/openNote/style/invert/dark/note.css": "OpenNote/openNote/style/invert/note.less",
					    	"OpenNote/openNote/style/invert/dark/alertify.css": "OpenNote/openNote/style/invert/alertify.less",
					    	"OpenNote/openNote/style/invert/dark/intojs.css": "OpenNote/openNote/style/invert/introjs.less",

					    	"OpenNote/openNote/style/simplicity/dark/style.css": "OpenNote/openNote/style/simplicity/style.less",
					    	"OpenNote/openNote/style/simplicity/dark/note.css": "OpenNote/openNote/style/simplicity/note.less",
					    	"OpenNote/openNote/style/simplicity/dark/alertify.css": "OpenNote/openNote/style/simplicity/alertify.less",
					    	"OpenNote/openNote/style/simplicity/dark/intojs.css": "OpenNote/openNote/style/simplicity/introjs.less"

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
					    	"OpenNote/openNote/style/invert/light/note.css": "OpenNote/openNote/style/invert/note.less",
					    	"OpenNote/openNote/style/invert/light/alertify.css": "OpenNote/openNote/style/invert/alertify.less",
					    	"OpenNote/openNote/style/invert/light/intojs.css": "OpenNote/openNote/style/invert/introjs.less",

					    	"OpenNote/openNote/style/simplicity/light/style.css": "OpenNote/openNote/style/simplicity/style.less",
					    	"OpenNote/openNote/style/simplicity/light/note.css": "OpenNote/openNote/style/simplicity/note.less",
					    	"OpenNote/openNote/style/simplicity/light/alertify.css": "OpenNote/openNote/style/simplicity/alertify.less",
					    	"OpenNote/openNote/style/simplicity/light/intojs.css": "OpenNote/openNote/style/simplicity/introjs.less"
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
		                browsers: ["PhantomJS"]//Override config browsers
		            }
		        },
		        watch: {
		            karma: {
		                files: ["src/**/*.js", "test/unit/**/*.js"],
		                tasks: ["karma:unit:run"]
		            }
		        },
		        shell: {
		            bowerInstall: {
		                command:  [	"cd OpenNote",
		                			"bower install" ].join("&&")
		            },
		            clean:{
		            	command:  [	"rm -rf build",
		            	           	"cd OpenNote",
		                			"rm -rf bower_components",
		                			"cd openNote/style/invert/",
		                			"rm -rf dark",
		                			"rm -rf light"].join("&&")
		            },
		            phpPackage:{
		            	command:  [	"mkdir build",
		            	           	"cd build",
		                			"cp -r ../OpenNote/* ./",
		            	           	"cp -r ../../OpenNoteService-PHP/Service ./",
									"cp -r ../../OpenNoteService-PHP/vendor ./"].join("&&")
		            }
		        },
	        //HTML 5
		        manifest: {
		            generate: {
						options: {
							basePath: "OpenNote/",
							exclude: ["openNote.appcache", "Service", "bower_components/intro.js"],
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

	//Task definition
	    //css
		    grunt.registerTask("buildDevCSS", ["less:devDark","less:devLight"]);
		    grunt.registerTask("buildProdCSS", ["less:prodDark","less:prodLight"]);

		//deployment
		    // you can run individual command using  the plug-in command syntax suck as manifest:generate or shell:clean
		    grunt.registerTask("build", ["shell:bowerInstall", "buildDevCSS", "manifest:generate"]);
			grunt.registerTask("default", ["build"]);
			grunt.registerTask("deploy", ["shell:clean", "shell:bowerInstall", "buildProdCSS", "manifest:generate", "shell:phpPackage"]);

		//testing
			grunt.registerTask("devmode", ["karma:unit", "watch"]);
			grunt.registerTask("test", ["karma:travis"]);
			grunt.registerTask("ci", ["build","jshint:all","karma:travis"]);
};
