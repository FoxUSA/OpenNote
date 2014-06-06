module.exports = function(grunt) {
	//Initializing the configuration object
	    grunt.initConfig({	
			/*less: {
				development: {
				    options: {
				    	paths: ["assets/css"]
				    },
				    files: {
				    	"path/to/result.css": "path/to/source.less"
				    }
			 	},
			 	production: {
				    options: {
				      paths: ["assets/css"],
				      cleancss: true,
				      modifyVars: {
				    	  imgPath: "http://mycdn.com/path/to/images"z,
				    	  bgColor: "red"
				      }
				    },
				    files: {
				    	"path/to/result.css": "path/to/source.less"
				    }
			 	}
			},*/
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
	            }
	        }
		});

	 //Plugin loading
		grunt.loadNpmTasks("grunt-contrib-less");
		grunt.loadNpmTasks("grunt-contrib-watch");
	    grunt.loadNpmTasks("grunt-karma");
	    grunt.loadNpmTasks("grunt-shell");
	
	//Task definition
	    grunt.registerTask("build", ["shell:bowerInstall"]);
		grunt.registerTask("default", ["less:development"]);
		grunt.registerTask("deploy", ["less:production"]);
		grunt.registerTask("devmode", ["karma:unit", "watch"]);
		grunt.registerTask("test", ["karma:travis"])
		grunt.registerTask("ci", ["shell:bowerInstall","karma:travis"])
};