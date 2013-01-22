
connectHub = function(o, url, params, method, tries){
	var loginReq = Titanium.Network.createHTTPClient();
	var urlText = "api/mobile/" + url + ".json";
	var url = Ti.App.getRemoteURL(urlText);
	tries = tries || 0; 			
	
	loginReq.open(method,url);
	loginReq.onload = function(e)
	{	
		var json = this.responseText;
		
		if (loginReq === null || json === null){
			if (tries < 3){
				tries++;
				Ti.API.info("trying .. " + tries);
				connectHub(o, _username, _password, tries);
				return;
			}
			else{
				if (o.error){ o.error();}
				return;
			}
		}
		
		var response = JSON.parse(json);
		//Ti.API.info(response);
	
		if (o.success){o.success(response);}
		
	};
	
	loginReq.onerror = function(e){
		if (o.error) {o.error();}
	};
	
	if (o.start) { o.start(); }
	loginReq.send(params);
	
}
module.exports = connectHub;