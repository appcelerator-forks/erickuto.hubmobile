package com.ashoka.hubmobile;

import org.appcelerator.titanium.ITiAppInfo;
import org.appcelerator.titanium.TiApplication;
import org.appcelerator.titanium.TiProperties;
import org.appcelerator.kroll.common.Log;

/* GENERATED CODE
 * Warning - this class was generated from your application's tiapp.xml
 * Any changes you make here will be overwritten
 */
public final class HubmobileAppInfo implements ITiAppInfo
{
	private static final String LCAT = "AppInfo";
	
	public HubmobileAppInfo(TiApplication app) {
		TiProperties properties = app.getSystemProperties();
		TiProperties appProperties = app.getAppProperties();
					
					properties.setString("ti.ui.defaultunit", "system");
					appProperties.setString("ti.ui.defaultunit", "system");
					
					properties.setString("ti.deploytype", "development");
					appProperties.setString("ti.deploytype", "development");
	}
	
	public String getId() {
		return "com.ashoka.hubmobile";
	}
	
	public String getName() {
		return "hubmobile";
	}
	
	public String getVersion() {
		return "1.0";
	}
	
	public String getPublisher() {
		return "ekuto";
	}
	
	public String getUrl() {
		return "http://hub.ashoka.org";
	}
	
	public String getCopyright() {
		return "2012 by ekuto";
	}
	
	public String getDescription() {
		return "not specified";
	}
	
	public String getIcon() {
		return "appicon.png";
	}
	
	public boolean isAnalyticsEnabled() {
		return true;
	}
	
	public String getGUID() {
		return "ed80b8b0-ebb3-48a2-9243-dd0f64b7bfbb";
	}
	
	public boolean isFullscreen() {
		return false;
	}
	
	public boolean isNavBarHidden() {
		return false;
	}
}
