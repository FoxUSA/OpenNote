import openNote from "../openNote.js";
var StorageService = require("../../../OpenNote-SharedServices/Storage.service.js");
/**
 * @author - Jake Liscom
 * @project - OpenNote
 */

var replicationTimeoutDuration=5000;

/**
 * Storage service
 */
openNote.service("storageService", ["$rootScope", function($rootScope) { //Needs to be a function not a lambda
    var replicationTimeout = null;

    StorageService.call(this,
        localStorage,
        PouchDB,
        { //Apply makes a function call act more as a macro then a function. Everything is run under this context
            options: {
                live: true,
                retry: true
            },
            callback: function(syncObject) {
                syncObject.on("complete", function() {
                    alertify.success("Replication complete");
                }).on("error", function() {
                    alertify.error("Replication error");
                }).on("paused", function() {
                    if (!replicationTimeout)
                        replicationTimeout = setTimeout(function() {
                            alertify.log("Replication complete");
                            replicationTimeout = null;

                            $rootScope.$emit("replicationComplete", {});
                            $rootScope.$apply();
                        }, replicationTimeoutDuration);
                });
            }
        }
    );

    //Execute
    this.init();
}]);
