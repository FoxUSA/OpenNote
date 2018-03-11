import openNote from "../openNote.js";
/**
 *randomly fade in element to have a wave effect
 */
openNote.directive("randomFadeInDirective", ["$timeout","config", function($timeout,config) {
	return {
		restrict: "C",//class
		link: function(scope, element) {
			element.hide().stop().fadeTo(config.fadeSpeedLong(),1);
		}
	};
}]);
