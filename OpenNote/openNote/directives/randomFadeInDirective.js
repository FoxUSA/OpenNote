/**
 *randomly fade in element to have a wave effect 
 */
openNote.directive("randomFadeInDirective", function($timeout,config) {
	return {
		restrict: "C",//class
		link: function(scope, element, attrs) {
			$timeout(function(){
				element.fadeIn(config.fadeSpeedLong());
			},10);
		}
	};
});