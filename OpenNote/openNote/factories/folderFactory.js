/**
 *Folder factory 
 */
openNote.factory("folderFactory", function($resource, apiToken) {
    var folder = $resource(config.servicePath+"/:id", { }, {
        get: {
            method: "GET",
            headers: { "token": apiToken}
        },
        save: {
            method: "POST",
            headers: { "token": apiToken}
        },
        update: {
            method: "PUT",
            headers: { "token": apiToken}
        },
        remove: {
            method: "DELETE",
            headers: { "token": apiToken}
        }
    });
    return folder;
 });