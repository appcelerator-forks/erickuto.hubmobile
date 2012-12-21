/*
 * Contains functions and variables common in a lot of functions
 * Keeping it DRY!
 */
function Utilities(){
	this.customFont = 'SpicyRice-Regular';
	this.customBgColor = '#f9f9f9';
	this.customTextColor = '#5e656a';
	this.customTitleColor = '#0b395c';
	
	var osname = Ti.Platform.osname;
	aw = Ti.Platform.displayCaps.platformWidth;
	ah = Ti.Platform.displayCaps.platformHeight;
	
	this.app_width = aw;
	this.app_height = ah;
	this.height_scale_factor = this.app_height/800.0;
	
	if (this.app_width > 500){
		this.app_width = 500;
	}
	this.width_scale_factor = this.app_width/500
	this.addImage = function(_imageView, _path){
		if (osname === 'android') {
			_imageView.image = "../../" + _path;
		}
		else {
			_imageView.image = _path;
		}
	};
	
}

module.exports = Utilities;