
openNote.controller("searchController", function($scope, $rootScope, searchService) {
	
	$scope.search = function(){
		searchService.search($scope.searchRequest).then(function(data){
			console.log(data);//TODO
		});
	}
});