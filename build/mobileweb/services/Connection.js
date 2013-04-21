hub = require("hub");

connectHub = function(o, url, postParams, method, getParams){
	var loginReq = Titanium.Network.createHTTPClient();
	var urlText = "api/mobile/" + url + ".json"; 
	if (url.substring(0,9) === "activities"){
		ulrText = urlText.replace("api/mobile", "");
	}
	 
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

	var url = hub.API.getRemoteURL(urlText);
	Ti.API.info("Fetching from: [" + url + "]");			
	
	loginReq.open(method,url);
	loginReq.onload = function(e)
	{	
		var json = this.responseText;
		
		var response = JSON.parse(json);
		//Ti.API.info(JSON.stringify(response));
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