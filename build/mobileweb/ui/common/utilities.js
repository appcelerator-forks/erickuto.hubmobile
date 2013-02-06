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
	
	/*
	if (this.app_width > 500){
		this.app_width = 500;
	}
	if (this.app_height > 800){
		this.app_height = 800;
	}*/
	this.height_scale_factor = this.app_height/800.0;
	this.width_scale_factor = this.app_width/500
	var imagePath = function(_path){
		image_path = "";
		
		if (osname === 'android') {
			image_path = "../../images/" + _path;
		}
		else {
			image_path = "images/" + _path;
		}
		
		return image_path;
	};
	this.imagePath = imagePath; 
	var win = Ti.UI.createWindow();
 
	// create an imageview and set it to the width and height of your images
	hubAPI.indicatorView =  Ti.UI.createImageView({
	  width:54,
	  height:54
	});
	 
	 
	// set the length of the images you have in your sequence
	var loaderArrayLength=7;
	 
	// initialize the index to 1
	var loaderIndex=0;
	 
	// this function will be called by the setInterval
	function loadingAnimation(){
	  // set the image property of the imageview by constructing the path with the loaderIndex variable
	  hubAPI.indicatorView.image = imagePath("spinner/" + loaderIndex + ".jpg");
	  //increment the index so that next time it loads the next image in the sequence
	  loaderIndex++;
	  // if you have reached the end of the sequence, reset it to 1
	  if(loaderIndex===loaderArrayLength)loaderIndex=0;
	}
	 
	// start the setInverval -- adjust the time to make a smooth animation
	var loaderAnimate = setInterval(loadingAnimation,160);

}

module.exports = Utilities;