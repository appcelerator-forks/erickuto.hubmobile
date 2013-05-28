/*
 * Contains functions and variables common in a lot of functions
 * Keeping it DRY!
 */

/*Adds a key value index to an array 
 */
function addVariable(_array, _index, _key, _value){
	var additions = {}
	additions["key" + _index] = _key; 
	additions["value" + _index] = _value; 
	_array.push(additions);
}
var osname = Ti.Platform.osname;

/*Different ways to load images depending on platform. */
var imagePath = function(_path, _level){
	image_path = "";
	
	if (osname === 'android') {
		if(_level){
			for (var i = 0; i < _level; i++){
				image_path += "../"; 
			}
		}
		image_path += "../../images/" + _path;
		Ti.API.info(image_path);
	}
	else {
		image_path = "images/" + _path;
	}
	
	return image_path;
};

function Utilities(){
	this.customFont = 'SpicyRice-Regular';
	this.customBgColor = '#f9f9f9';
	this.customTextColor = '#5e656a';
	this.customTitleColor = '#0b395c';
	
	aw = Ti.Platform.displayCaps.platformWidth;
	ah = Ti.Platform.displayCaps.platformHeight;
	var osname = Ti.Platform.osname;
	this.osname = osname; 
	this.app_width = aw;
	this.app_height = ah;
	
	this.height_scale_factor = this.app_height/800.0;
	this.width_scale_factor = this.app_width/500
	this.magnified_height_scale_factor = this.app_height/800.0;
	this.magnified_width_scale_factor = this.app_width/500
	if (this.app_width > 500){
		this.width_scale_factor = 1; 
	}
	if (this.app_height > 800){
		this.height_scale_factor = 1; 
	}
	
	this.imagePath = imagePath; 
}

module.exports = Utilities;