/**
 * Event page script for the SearchDirect Chrome Extension. The extension will send a message to the event page with the search string, and the 
 * string will be saved on this page. Upon the next page load, if there is a string in the event page it will be passed to the next page an search for the string will commence. 
 */


$(document).ready(function() {
	var searchString = chrome.storage.local.get("searchString");
	chrome.storage.local.remove("searchString");
	if (searchString != undefined) {
		chrome.storage.local.remove("searchString");
		console.log("String found: " + searchString);
		alert(searchString);
	}
	
	
});