/**
 *randomly fade in element to have a wave effect 
 */
openNote.directive("randomFadeInDirective", function($timeout) {
	return {
		restrict: "C",//class
		link: function(scope, element, attrs) {
			$timeout(function(){
				element.fadeIn(config.fadeSpeedLong()*Math.random()+200);
			},0);
		}
	};
});