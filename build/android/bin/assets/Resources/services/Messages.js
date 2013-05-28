var category = null; 
var params = null;
var isReady = false; 
var results = [];
var counts = {}; 
var hasMore = false; 
var page = 0; 

function Messages(_category, _params, o){
	
	category = _category; 
	params = _params; 
	Connection = require('services/Connection');
	
	var response = new Connection({
		start: function() {
			if (o.start) { o.start(); }
			},
			
		error: function() {
			if (o.error) { o.error(); }
			},
		
		success: function(_json){
				page = _json.page;
				if (page == 0){
					results = []; 
				}
				if (_json.hasMore == true){
					hasMore = true; 
				}
				else{
					hasMore = false; 
				}
				if (category === "message_threads/count"){
					counts = _json;
					o.success();
				}
				else{
					_results = _json.results; 
					for (i = 0; i < _results.length; i++){
						results.push(_results[i]);
					}
					o.success();
				}
			}
	}, _category , [], "GET", _params);
	
	this.getMessageThreads = function(_results){
			for (i = 0; i < results.length; i++){
				_results.push(results[i]);
			}
	};
	var getParticipant = function(participant_id, thread_id){
		participants = results[thread_id].participants; 
		var index = 0; 
		
		while (index < participants.length){
			if (participants[index].id === parseInt(participant_id)){
				return participants[index]; 
			}
			index++; 
		}
		
		Ti.API.info('RED ALERT!! PARTICIPANT NOT FOUND ' + participant_id);
		Ti.API.info(JSON.stringify(participants));
		return null; 
		
	}
	this.getMessages = function(index, message_thread){
		message_thread = {
			messages:[],
			recipient:{
				name:"", 
				image_url:"",
			},
		};
		var recipient_object = results[index].participants[0];
		recipient_details = getParticipant(recipient_object.participantPath.replace("/users/", ""), index);
		message_thread.recipient.name = recipient_details.displayName; 
		message_thread.recipient.image_url = recipient_details.avatarUrl;
		messages_input = results[index].messageContent; 
		
		for (var i = 0; i < messages_input.length; i++) {
			
			message = {
				sender:{},
				body:"",
				time:"",
			};
			sender = {
				name:"",
				image_url:"",
			};
			participant_id = messages_input[i].user_id; 
			participant = getParticipant(participant_id, index);
			sender.name = participant.displayName; 
			sender.image_url = participant.avatarUrl;
			message.sender = sender; 
			message.body = messages_input[i].body;
			message.time = messages_input[i].updated_at;
			message_thread.messages.push(message);
		}
		
		return message_thread;
	}
	this.getCounts = function(_category){
		return counts[_category];  
	};
	this.isReady = function(){
		return isReady; 
	}
	this.hasMore = function(){
		return hasMore; 
	}
	this.getPage = function(){
		return page; 
	}
	this.changeReadyState = function(state){
		isReady = state; 
	}
	
}

module.exports = Messages; 

