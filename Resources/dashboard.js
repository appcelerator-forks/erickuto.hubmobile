
exports.createDashboard = function(name, email){

var win = Ti.UI.createWindow({
	backgroundColor:'yellow', 
	layout:'vertical',
}); 

var name_label = Ti.UI.createLabel({
	text: "my name is " + name
});

var email_label = Ti.UI.createLabel({
	text: "my email is " + email
});
win.add(name_label);
win.add(email_label);
win.open();
}