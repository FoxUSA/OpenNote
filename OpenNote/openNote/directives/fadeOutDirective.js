/**
 *randomly fade in element to have a wave effect
 */
openNote.directive("fadeOutDirective", function() {
	return {
		restrict: "C",//class
		link: function(scope, element) {
			element.stop().fadeTo(10000,0);
		}
	};
});
