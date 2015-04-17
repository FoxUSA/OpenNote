/**
 * @author - Jake Liscom 
 * @project - OpenNote
 */

/**
 * Storage service
 */
openNote.service("storageService", function () {	
	
	var localDatabase = new PouchDB("openNote");
	
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
	
	
	
});