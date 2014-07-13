module.exports = function(config){
	config.set({
		basePath : "../",
		files : [
		         "OpenNote/bower_components/angular/angular.js",
		         "OpenNote/bower_components/angular-mocks/angular-mocks.js",
		         "OpenNote/bower_components/angular-route/angular-route.js",
		         "OpenNote/bower_components/angular-resource/angular-resource.js",
		         "OpenNote/bower_components/angular-sanitize/angular-sanitize.js",
		         "OpenNote/bower_components/angular-animate/angular-animate.js",
		         "OpenNote/bower_components/angular-ui-tree/dist/angular-ui-tree.js",
		         "OpenNote/bower_components/jquery/jquery.js",
		         "OpenNote/openNote/openNote.js",
		         "OpenNote/openNote/**/*.js",
		         "OpenNote.Test/**/*.js"
		     ],
		autoWatch : false,
		frameworks: ["jasmine"],
		browsers : ["Firefox"],
		plugins : [
		            "karma-junit-reporter",
		            "karma-chrome-launcher",
		            "karma-firefox-launcher",
		            "karma-phantomjs-launcher",
		            "karma-jasmine"
		            ],
        junitReporter : {
        	outputFile: "test_out/unit.xml",
        	suite: "unit"
        }	
	})
}