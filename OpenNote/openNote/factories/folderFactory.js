/**
 *Folder factory 
 */
openNote.factory("folderFactory", function($resource, userService, config) {
	return $resource(config.servicePath()+"/folder/:id", {}, {//{} default params
        get: {
            method: "GET",
            params:{levels: 1, includeNotes: true, includeNotesHTML: false},//override default params
            url: config.servicePath()+"/folder/"//override
        },
        save: {
            method: "POST"
        },
        update: {
            method: "PUT"
        },
        remove: {
            method: "DELETE"
        }
    });
 });