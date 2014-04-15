/**
 * Angular js config file
 */
openNote.constant("config", {
	servicePath: function(){
		return "/OpenNoteService-PHP";
	},
	
	fadeSpeedShort: function(){ 
		return 250*Math.random()+200;
	},
	
	fadeSpeedLong: function(){
		return 2000*Math.random()+200;
	}
});