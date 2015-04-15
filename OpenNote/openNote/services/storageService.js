/**
 * @author - Jake Liscom 
 * @project - OpenNote
 */

/**
 * Storage service
 */
openNote.service("storageService", function () {	
	
	var localDatabase = new PouchDB("openNote");
	
	/**
	 * Get a document from the database
	 */
	this.database = function(){
		return localDatabase;
	};
	
	
	
});