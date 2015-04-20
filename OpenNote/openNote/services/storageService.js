/**
 * @author - Jake Liscom 
 * @project - OpenNote
 */

/**
 * Storage service
 */
openNote.service("storageService", function () {	
	
	var localDatabase = null;
	var remoteDatabase = null;
	
	/**
	 * Initialize the PouchDB database and create indexes
	 */
	this.init = function(){
		//Create or find database
			localDatabase = new PouchDB("openNote");
		
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
				});
				
		//Re-init sync		
			if(localStorage.getItem("remoteURL"))
				this.setupSync();
	};
	
	/**
	 * @param url - The remote URL to use in replication
	 */
	this.setRemoteURL = function(url){
		localStorage.setItem("remoteURL",url);
		remoteDatabase = new PouchDB(url);
	};
	
	/**
	 * Get the local database
	 */
	this.database = function(){
		return localDatabase;
	};
	
	/**
	 * Get the remote database
	 */
	this.remoteDatabase = function(){
		return remoteDatabase;
	};
	
	/**
	 * Setup live sync
	 */
	this.setupSync = function(){
		localDatabase.sync(remoteDatabase,{live: true, retry: true}).on("complete", function () {
			alertify.success("Replication complete");
		}).on("error", function (err) {
			alertify.error("Replication error");
		}).on("change", function (change) {//FIXME
			//alertify.log("Database changed");
		}).on("paused", function (info) {
			//alertify.log("Replication paused");
		}).on("active", function (info) {
			//alertify.log("Replication active");
		});
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
		localDatabase.destroy().then(function(){
			this.init();
			callback();
		});
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
		
	};
	
	//First time create database
		this.init();
});