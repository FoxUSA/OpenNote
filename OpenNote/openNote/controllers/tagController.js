
openNote.controller("tagController", function(	$scope,
												$rootScope,
												$location,
												$routeParams,
												storageService,
												config,
												tagService) {
		$rootScope.buttons=[];

		/**
		 * Load a note
		 * @param note - load a note
		 */
		$scope.loadNote = function(note){
			$(".note").fadeTo(config.fadeSpeedShort(),0,function(){
				$location.url("/note/"+note._id);
				$scope.$apply();
			});
		};

		/**
		 * Load tags
		 */
		var loadTags = function(){
			tagService.getMap().then(function(map){
				var tags = map.tags[$scope.tag];
				var db = storageService.database();
				tags.forEach(function(tag){
					db.get(tag).then(function(note){
						$scope.notes.push(note);
						$scope.$apply();
					});
				});
			});
		};
		$scope.notes=[];
		$scope.tag = $routeParams.tag;
		loadTags();
});
