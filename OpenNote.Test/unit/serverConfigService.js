/**
 * Helper method to create config for testing
 */
var serverConfig=function(uploadEnabled, registrationEnabled){
	return{"uploadEnabled":uploadEnabled,"registrationEnabled":registrationEnabled}
};

var randomTrueFalse = function(){
	return Math.random() < 0.5 ? true : false;
};

var mockTokenString = "To the moon!";

describe("serverConfigService", function() {
	var $httpBackend; 
	
	/**
	 * Setup common test
	 */
	beforeEach(function(){
		
		module("openNote"); //load openNote module
		
		module(function($provide) { //moch user service because it is used in the serverConfig service
			$provide.value("userService", {
				getAPITokenObject: function(){ return { token:mockTokenString}; }
		    });
        });
		
		inject(function($injector, config) {
			//clean up server config
				delete sessionStorage.serverConfig;
				
		    // Set up the mock http service responses
		    	$httpBackend = $injector.get("$httpBackend");
		     	
		    // backend definition common for all tests
		    	$httpBackend.when("GET", config.servicePath()+"/config/").respond(serverConfig(true,true));
		});
	})
	
	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
	    $httpBackend.verifyNoOutstandingRequest();
	});
	
	it("should not send a get request if serverConfig cache is set", inject(function($injector, config) {//inject location and config
		var $service = $injector.get("serverConfigService");
 		var testConfig = serverConfig(randomTrueFalse(),randomTrueFalse());
 		
 		sessionStorage.serverConfig = angular.toJson(testConfig);
 		$service.getConfig().then(function(config){
 			expect(config).toEqual(testConfig);
 		});
	}));
	
	it("should send a get request if serverConfig cache is not set", inject(function($injector, config) {//inject location and config
		$httpBackend.expectGET(config.servicePath()+"/config/");
		var $service = $injector.get("serverConfigService");
 		var testConfig = serverConfig(true, true);
 		
 		delete sessionStorage.serverConfig; //clean up before hand
 		$service.getConfig().then(function(config){
 			expect(config).toEqual(testConfig);
 		});
 		$httpBackend.flush();	
	}));
	
	
	it("should set ckeditor upload values if serverConfig says uploads are enabled", inject(function($injector, config) {//inject location and config
		var $service = $injector.get("serverConfigService");
 		var testConfig = serverConfig(true, randomTrueFalse());
 		sessionStorage.serverConfig = angular.toJson(testConfig);
 		
 		$service.getEditorConfig().then(function(config){
 			expect(config.filebrowserUploadUrl).toBeDefined();
 			expect(config.filebrowserImageUploadUrl).toBeDefined();
 		});
	}));
	
	it("should set ckeditor upload values if serverConfig says uploads are not enabled", inject(function($injector, config) {//inject location and config	
		var $service = $injector.get("serverConfigService");
		 
 		var testConfig = serverConfig(false, randomTrueFalse());
 		sessionStorage.serverConfig = angular.toJson(testConfig);
 		
 		$service.getEditorConfig().then(function(config){
 			expect(config.filebrowserUploadUrl).not.toBeDefined();
 			expect(config.filebrowserImageUploadUrl).not.toBeDefined();
 		});
	}));
	
	it("should set editor congig upload url to include current token", inject(function($injector, config) {//inject location and config	
		var $service = $injector.get("serverConfigService");
		 
 		var testConfig = serverConfig(true, randomTrueFalse());
 		sessionStorage.serverConfig = angular.toJson(testConfig);
 		
 		$service.getEditorConfig().then(function(config){
 			expect(config.filebrowserUploadUrl).toMatch("token="+mockTokenString);
 		});
	}));
	
});