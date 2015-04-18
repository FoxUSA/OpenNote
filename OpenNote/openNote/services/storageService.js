/**
 * @author - Jake Liscom 
 * @project - OpenNote
 */

/**
 * Storage service
 */
openNote.service("storageService", function () {	
	
	var localDatabase = new PouchDB("openNote");
	
	//Indexes
		// create a design doc
			var parentFolderDesignDoc = {
				_id: "_design/folder",
				views: {
					parentFolderID: {
						map: function (doc) {
						  emit(doc.parentFolderID);
						}.toString()
					}
				}
			};
	
		// save the design doc
			localDatabase.put(parentFolderDesignDoc).catch(function (err) {
				if (err.status !== 409) {
					throw err;
				}
				// ignore if doc already exists
			}).catch(function (err) {
				console.log(err);//FIXME
			});
	
	/**
	 * Get a document from the database
	 */
	this.database = function(){
		return localDatabase;
	};
	
	/**
	 * Load a folders contents
	 * @param folderID - the folder id to load the content folder
	 * @param callback - query callback handler
	 */
	this.loadFolderContents = function(folderID, callback){
		localDatabase.query("folder/parentFolderID", {key: folderID, include_docs: true}).then(callback);
	};
	
	/**
	 * Delete the database
	 */
	this.destroyDatabase = function(callback){
		localDatabase.destroy().then(callback);
	};
	
	/**
	 * Dump database to a file
	 * @param callback - callback where data is returned to
	 */
	this.databaseToFile = function(callback){
		localDatabase.allDocs({
		  include_docs: true
		}).then(function (result) {
			
			callback("data:application/octet-stream;charset=utf8," + encodeURIComponent(JSON.stringify({ data:result.rows})));
		});
	};
	
	/**
	 *
	 */
	this.cleanOrphans = function(){//FIXME
		
	}
});