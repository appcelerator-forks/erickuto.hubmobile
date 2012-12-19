
HUB.ui.LoginController = (function(){
			
    function grantEntrance(name, email){
    	Ti.include("../views/DashBoardView.js");
    	var win = HUB.ui.DashBoardView.createWindow(name, email);
    	win.open();
    }
    
    function denyEntrance(w){
    	HUB.ui.LoginView.showLoginFail(w);
    }
    function handleLoginEvent(w){
    	var loginReq = Titanium.Network.createHTTPClient();
		
		loginReq.open("POST","http://50.17.229.217/ashokahub/authenticate.php");
					
		var params = {
			username: w.username.value,
			password: w.password.value
		};
		loginReq.send(params);
		
		loginReq.onload = function()
		{	
			var json = this.responseText;
			var response = JSON.parse(json);
			if (response.logged == true)
			{
				w.username.blur();
				w.password.blur();
				grantEntrance(response.name,response.email);
				w.close();
			}
			else
			{
				w.username.blur();
				w.password.blur();
				denyEntrance(w);
			}
		};
		
    }
    
    function setEventListeners(w){	
		
        w.loginBtn.addEventListener('click',function(e)
		{
			if (w.username.value != '' && w.password.value != '')
			{
				handleLoginEvent(w);
			}
			else
			{
				alert("Username/Password are required");
			}
		});
    }
	
		
    return {
        init: function(){
            var win = HUB.ui.LoginView.createWindow();
            setEventListeners(win);
            win.open();
        }
    };
})();

