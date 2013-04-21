function AboutView(_authToken){
	hub = require("hub");
	var hsf = hub.API.hsf;
	var wsf = hub.API.wsf;
	var margin_offset = (hub.API.app_width-350*wsf)/2;

	var appWindow = require("ui/common/UserView");
    win = new appWindow();

	var profile = hub.API.user.profile.user;
	var self = Ti.UI.createView({
		backgroundColor:hub.API.customBgColor,
	});
	var pic_summary_holder = Ti.UI.createView({
		top:0, 
		left:0,
		height: 150,
		layout: "horizontal"
	});
	
	var profile_pic = Ti.UI.createImageView({
		top:5*hsf,
		width:100,
		left:5*wsf, 
		image:hub.API.imagePath("einstein.png")
	});
	
	var summary = Ti.UI.createView({
		top:5*hsf, 
		width:(hub.API.app_width - 110), 
		left:5*hsf,
		layout:"vertical"
	});
	var name = profile.first_name + " " + profile.last_name;
	summary.add(Ti.UI.createLabel({
		top: 5*hsf,
		text: name,
		height: 25,
		left: 5*hsf,
		color: "black",
		font: {
			fontSize: 20, 
			fontWeight: "bold",
		}
	}));
	summary.add(Ti.UI.createLabel({
		top: 5*hsf,
		text: hub.API.userTypes[profile.user_type_id],
		left: 5*hsf,
		height: 20,
		font: {
			fontSize: 15, 
		},
		color: "blue",
	}));

	pic_summary_holder.add(profile_pic);
	pic_summary_holder.add(summary);
	
	self.add(pic_summary_holder);
	
	var contentHolder = Ti.UI.createView({
		top:150,
		//backgroundColor: "blue", 
		left: 5, 
		height: "auto", 
		width:(hub.API.app_width - 10), 
		layout: "horizontal"
	});
	
	var aboutText = Ti.UI.createLabel({
		top: 5, 
		left: 5, 
		height: "auto",
		width: "auto", 
		text: profile.about,
	});
	
	contentHolder.add(aboutText); 
	self.add(contentHolder); 
	
	var iconsHolder = Ti.UI.createView({
		top:10,
		//backgroundColor: "blue", 
		left: 5, 
		height: "auto", 
		width:(hub.API.app_width - 10), 
		layout: "horizontal"
	});
	
	var openPage = function(_page){
		var pageURL = 'ui/common/dashboardViews/profileViews/' + _page;
		PageView = require(pageURL);
	    pageView = new PageView();
		hub.API.openWindow(pageView);
	}
	
	var createIcon = function(_icon_name){
		var image_name = _icon_name + ".png";
		var icon = Ti.UI.createImageView({
			left: 10*wsf, 
			top: 5*hsf,
			width: 60, 
			image:hub.API.imagePath(image_name)
		});
		profile_link = {
			change_makers: profile.changemakers_profile_url,//profile.change_makers_profile_url, 
			linked_in: profile.linkedin_profile_url,//"http://m.linkedin.com",
			youtube: profile.profile_video_url,
			skype: '"skype:"skypeName', 
		};
		
		icon.addEventListener('click', function(){
			Ti.Platform.openURL(profile_link[_icon_name]); 
			Ti.API.info(profile_link[_icon_name])
		});
		return icon; 
	}
	icons = ["change_makers", "linked_in", "skype", "youtube"]; 
	for (var i = 0; i < icons.length; i++){
		icon = createIcon(icons[i]); 
		iconsHolder.add(icon);
	}
	contentHolder.add(iconsHolder); 
	win.addContent(self);
	thisWindow = win.appwin;
	return thisWindow;
	}	
module.exports = AboutView;