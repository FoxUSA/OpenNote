/**
 * @author - Jake Liscom 
 * @project - OpenNote
 */

/**
 * Server configuration service
 */
openNote.service("serverConfigService", function ($http, $q, config, userService) {	
	/**
	 * @return - config object prmoise
	 */
	this.getConfig = function(){
		if(sessionStorage.serverConfig==null)//if we do not have it yet, request it
			return requestServerConfig();
		
		//make a quick promise
			var deferred = $q.defer();
			deferred.resolve(angular.fromJson(sessionStorage.serverConfig));
			return deferred.promise;
	};
	
	/**
	 * Get server config list from server
	 */
	var requestServerConfig = function(){ 
		return $http.get(config.servicePath() +"/config/").then(
			function(response){//Successful
				if(response.status==200){
					sessionStorage.serverConfig=angular.toJson(response.data);
					return response.data;	
				}
				return false;
			},
			function(response){
				return false;
			}
		);
		
		
		return promise;
	};
	
	/**
	 * @param dark - true if dark theme
	 * @return - ckeditor config object
	 */
	this.getEditorConfig = function(){
		var dark = config.isDarkTheme();
		return this.getConfig().then(function(data){
			var temp = {
					// Define changes to default configuration here. For example,
					// config.language : 'fr',
					//config.uiColor : '#000000',
					
					removePlugins 				:	"newpage,save,templates,about,liststyle,tabletools,scayt,contextmenu", //remove some icons menu button
					
					//extraPlugins				:	"imagepaste",
					
					height 						: 	"400px",
					disableNativeSpellChecker 	: 	false
				};
				
				//style sheet
					if(dark){
						temp.contentsCss = "openNote/style/invert/dark/note.css";
						temp.skin = "moono.dark,../../openNote/style/dark/ckeditor/moono.dark/";
					}
					else{
						temp.contentsCss = "openNote/style/invert/light/note.css";
					};
				
				//configure the upload path if uploads are enabled
					if(data.uploadEnabled){
						temp.filebrowserUploadUrl = config.servicePath()+"/file/"+"?token="+userService.getAPITokenObject().token;
						temp.filebrowserImageUploadUrl = temp.filebrowserUploadUrl;
					};
				return temp;
		});
	};
});