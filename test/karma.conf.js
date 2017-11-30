module.exports = function(config){
	config.set({
		basePath : "../",
		files : [
		         "node_modules/es5-shim/es5-shim.min.js",
		         "node_modules/angular/angular.js",
		         "node_modules/angular-mocks/angular-mocks.js",
		         "node_modules/angular-route/angular-route.js",
		         "node_modules/angular-resource/angular-resource.js",
		         "node_modules/angular-sanitize/angular-sanitize.js",
		         "node_modules/angular-animate/angular-animate.js",
		         "node_modules/pouchdb/dist/pouchdb.min.js",
		         "node_modules/jquery/jquery.js",
		         "openNote/openNote.js",
		         "openNote/**/*.js",
		         "OpenNote.Test/**/*.js"
		     ],
		autoWatch : false,
		frameworks: ["jasmine"],
		browsers : ["Firefox"],
		plugins : [
		            "karma-phantomjs-launcher",
		            "karma-jasmine"
		            ],
        junitReporter : {
        	outputFile: "test_out/unit.xml",
        	suite: "unit"
        }
	});
};
