/*
 * DashBoard UI.
 */
HUB.ui.DashBoardView = (function(){
    var customFont = 'SpicyRice-Regular';
	var customBgColor = '#f9f9f9';
	var customTextColor = '#5e656a';
	var customTitleColor = '#0b395c';
	
    function buildDashBoard(name, email){
        win = HUB.ui.ProfileView.buildMainWindow();
		welcome_text = "Welcome to your dashboard " + name + ". Your email is " + email;
		var dashboardStuff = Ti.UI.createLabel({
			text:welcome_text,
				top:2, 
				left:50,
				font:{
			      fontSize:12,
			      fontFamily: customFont
			   },
				color:'red'
		});
		HUB.ui.ProfileView.addContent(dashboardStuff, win);
        return win;
    }
	
    return {
        createWindow: function(name, email){
            var mainWindow = buildDashBoard(name, email);
            return mainWindow;
        }, 
        showLoginFail: function(win){
        	showLoginFail(win);
        }
    };
})();
