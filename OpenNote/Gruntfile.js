module.exports = function(grunt) {
	//Initializing the configuration object
	    grunt.initConfig({	
			less: {
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
			}
		});

	 //Plugin loading
		grunt.loadNpmTasks("grunt-contrib-less");
	
	//Task definition
		grunt.registerTask("default", ["less:development"]);
		grunt.registerTask("deploy", ["less:production"]);
};