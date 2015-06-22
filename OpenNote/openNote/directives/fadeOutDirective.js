/**
 *randomly fade in element to have a wave effect
 */
openNote.directive("fadeOutDirective", function($timeout,config) {
	return {
		restrict: "C",//class
		link: function(scope, element, attrs) {
			element.stop().fadeTo(10000,0);
		}
	};
});
