/**
 *Note factory 
 */
openNote.factory("noteFactory", function($resource, userService, config) {
	return $resource(config.servicePath()+"/note/:id", { }, {
        get: {
            method: "GET"
        },
        save: {
            method: "POST"
        },
        remove: {
            method: "DELETE"
        }
    });
 });