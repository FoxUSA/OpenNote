/**
 * Use to do a wave animation for folders and notes
 */
openNote.animation(".waveAnimation", function(config){
	return {
		enter: function(element, done){
			element.fadeIn(config.fadeSpeedLong(), done);
		},
		leave: function(element, done){
			element.fadeOut(config.fadeSpeedShort(),done);
		}
	}
});