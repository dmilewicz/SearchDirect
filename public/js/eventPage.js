/**
 * Event page script for the SearchDirect Chrome Extension. The extension will send a message to the event page with the search string, and the 
 * string will be saved on this page. Upon the next page load, if there is a string in the event page it will be passed to the next page an search for the string will commence. 
 */

var tab_badges = {};


chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {

		debug_log("Recieved " + request.type + " at event page");
	
		if (!request.type) {
			debug_log("ERR: No type");
			return;
		}

		switch (request.type) {

			// report the string to be searched for
			case SEARCH_STRING_MSG: 
				
				chrome.tabs.onUpdated.addListener(function sendString(tabId, info, tab) {
					if (tabId == sender.tab.id) {
						console.log(request.searchString);
						chrome.tabs.sendMessage(sender.tab.id, { type: RELAYED_SEARCH_STRING_MSG, searchString : request.searchString, page : request.page });
						chrome.tabs.onUpdated.removeListener(sendString);
					}
				});
				break;

			// check ofr badge update condition
			case BADGE_UPDATE_MSG: 
				console.log("badge update request:", request.count);
				badgeUpdate(sender.tab.id, request.count);
				break;

		}
	}
);
		
chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
	if (info.url) { // url has changed, clear the badge
		badgeUpdate(tabId, "");
	}
});

function badgeUpdate(id, msg) {

	if (msg == SEARCH_FAILURE) {
		chrome.browserAction.setBadgeBackgroundColor({ color: RED, tabId:id});
	}

	chrome.browserAction.setBadgeText({ text: msg , tabId : id});
	tab_badges[id] = msg;
}

	