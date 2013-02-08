
connectHub = function(o, url, postParams, method, tries, getParams){
	var loginReq = Titanium.Network.createHTTPClient();
	var urlText = "api/" + url + ".json";
	var getArgs = "";
	var page = 0; 
	
	if (getParams != null){
		for (var i = 0; i < getParams.length; i++){
			key = "key" + i; 
			value = "value" + i; 
			
			if (i == 0){
				getArgs = getArgs + "?" + getParams[i][key] + "=" + getParams[i][value]; 
			}
			else{
				getArgs = getArgs + "&" + getParams[i][key] + "=" + getParams[i][value]; 
			}
			if (getParams[i][key] === "page"){
				page = getParams[i][value]; 
			}
		}
		urlText = urlText + getArgs;
		
	}
	
	
	var url = Ti.App.getRemoteURL(urlText);
	Ti.API.info(url);
	
	tries = tries || 0; 			
	
	loginReq.open(method,url);
	loginReq.onload = function(e)
	{	
		var json = this.responseText;
		
		if (loginReq === null || json === null){
			if (tries < 3){
				tries++;
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
		response.page = page; 
		if (o.success){o.success(response);}
		
	};
	
	loginReq.onerror = function(e){
		if (o.error) {o.error();}
	};
	
	if (o.start) { o.start(); }
	loginReq.send(postParams);
	
}
module.exports = connectHub;