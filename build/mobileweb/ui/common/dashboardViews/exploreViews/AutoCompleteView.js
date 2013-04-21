hub = require("hub");
//Table view showing your autocomplete values
var selectedTagOptions = []; 
var searchArray = []; 

var dataHolder = Ti.UI.createView({
	top: 50, 
	layout: "Vertical", 
});

var selectedTags = Ti.UI.createView({
	layout: "horizontal"
});

var tblvAutoComplete = Ti.UI.createTableView({
    top: 5,
    width           : '100%',
    backgroundColor : '#EFEFEF',
    height          : 0,
    maxRowHeight    : 35,
    minRowHeight    : 35,
    allowSelection  : true
});

var txtAutoComplete = Ti.UI.createSearchBar({
		top:0,
		left: 3, 
		hintText:"Enter Free Tags",
		barColor: '#f6f6f6',
		width: 270,
		value: "", 
		//showCancel:true,
		//width:350*wsf,
	});
	
tblvAutoComplete.addEventListener('click',function(e){
    var selectedRow = e.rowData.result;
    selectedTagOptions.push(selectedRow);
    loadSelectedTags(); 
    clearSearchBar(); 
    CreateAutoCompleteList([]);
});
function removeTag(tagText){
	removeFromArray(selectedTagOptions, tagText);
	loadSelectedTags(); 
}

function clearSearchBar(){
	txtAutoComplete.blur();
    txtAutoComplete.value = ""; 
    txtAutoComplete.hide(); 
    txtAutoComplete.show(); 
}
function removeFromArray(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function loadSelectedTags(){
	dataHolder.remove(selectedTags); 
	selectedTags = Ti.UI.createView({
		layout: "horizontal"
	});
	for (var i = 0; i < selectedTagOptions.length; i++){
		tagIcon = createTag(selectedTagOptions[i]); 
		selectedTags.add(tagIcon);
	}
	dataHolder.add(selectedTags);
}
function createTag(tagText){
	var maxWidth = 200; 
	
	var tagView = Ti.UI.createView({
		left: 5,  
		top: 3, 
		width: 1,
		height: 30,  
		backgroundColor: "#E6E6E6", 
		borderWidth: 1,
		borderColor: '#2E2E2E',  
		borderRadius: 5, 
		layout: "horizontal"
	});
	var tagHolder = Ti.UI.createView({
		left: 3, 
		top: 0, 
		width: 30, 
		height: 30,
	});
	var tagX = Ti.UI.createImageView({
		top:0,
		height: 20, 
		width: 20, 
		image:hub.API.imagePath('delete.png'),
	});
	tagHolder.add(tagX);
	tagHolder.addEventListener('click', function(e){
		removeTag(tagText);
	})
	var tagTextLabel = Ti.UI.createLabel({
		left: 3, 
		text: tagText, 
		font: {
			fontSize: 18,
		},
		width: 'auto',
		color: "black",
		height: 30,
	});
	ttlWidth = tagTextLabel.toImage().width; 
	
	if (ttlWidth > maxWidth){
		ttlWidth = maxWidth; 
	}
	tagTextLabel.width = ttlWidth; 
	
	tagView.width =  ttlWidth + tagHolder.toImage().width + 10; 
	tagView.add(tagTextLabel, tagHolder);
	return tagView; 
}

dataHolder.add(tblvAutoComplete);

var searchBarHolder = Ti.UI.createView({
	top:0, 
	height: 40,
	width: 350,
	layout:"horizontal"
});

var cancelButton = Titanium.UI.createButton({
		top:10,
		borderRadius:1,
		width: 60, 
		height: 25,
		right:3,
		title: "Cancel",
	});
searchBarHolder.add(txtAutoComplete);
searchBarHolder.add(cancelButton);
cancelButton.addEventListener('click', function(e){
	txtAutoComplete.blur();
});
//Starts auto complete 
txtAutoComplete.addEventListener('change', function(e){ 
    var pattern = e.source.value;
    var tempArray = PatternMatch(searchArray, pattern);
    CreateAutoCompleteList(tempArray);
});
//You got the required value and you clicks the word
tblvAutoComplete.addEventListener('click', function(e){
    txtAutoComplete.value = e.rowData.result; 
});

//Returns the array which contains a match with the pattern
function PatternMatch(arrayToSearch, pattern){
    var searchLen = pattern.length;
    var tempArray = [];
    if (pattern.length > 2){
    	for(var index = 0, len = arrayToSearch.length; index< len; index++){
	        if(arrayToSearch[index].substring(0,searchLen).toUpperCase() === pattern.toUpperCase()){
	            tempArray.push(arrayToSearch[index]);
	        }
	    }
    }
    
    return tempArray;
}
//setting the tableview values
function CreateAutoCompleteList(searchResults){
    var tableData = [];
    for(var index=0, len = searchResults.length; index < len; index++){

            var lblSearchResult = Ti.UI.createLabel({
                top            : 2,
                width          : '40%',
                height         : 34,
                left           : '5%',
                font           : { fontSize : 14 },
                color          : '#000000',
                text           : searchResults[index]
            });

            //Creating the table view row
            var row = Ti.UI.createTableViewRow({
               backgroundColor : 'transparent',
               focusable       : true,
               height          : 50,
               result          : searchResults[index]
            });

            row.add(lblSearchResult);
            tableData.push(row);
    }
    tblvAutoComplete.setData(tableData);
    tblvAutoComplete.height = tableData.length * 35;
}

function AutoCompleteView (inputArray){
	selectedTagOptions = hub.API.user.getSelectedOptions("free"); 
	searchArray = inputArray; 
	
	var self = Ti.UI.createView({
		top:0
	});
	self.add(searchBarHolder);
	
	loadSelectedTags();
	self.add(dataHolder);
	return self; 
}

module.exports = AutoCompleteView; 