/**
 * Event page script for the SearchDirect Chrome Extension. The extension will send a message to the event page with the search string, and the 
 * string will be saved on this page. Upon the next page load, if there is a string in the event page it will be passed to the next page an search for the string will commence. 
 */

var tab_badges = {};
var pages = {}

// setInterval(function() {
// 	for (tab in pages) {
// 		chrome.tabs.sendMessage(parseInt(tab), pages[tab]);
// 	}
// 	console.log(pages);
// }, 500);


function active_conn(msg, tabId) {
	// alert("running!");
	if (tabId in pages) {
		console.log("once");
		chrome.tabs.sendMessage(tabId, msg); 
		setTimeout(function(){ active_conn(msg, tabId); }, 500);

	} else {
		console.log("err not found");

		// no more calls
	}
}


chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {

		debug_log("Recieved " + message.type + " at event page");

		if (!message.type) {
			debug_log("ERR: No type");
			return;
		}

		switch (message.type) {
			// receive from google page tab the string to search for
			case SEARCH_STRING_MSG: 
				

				chrome.tabs.onUpdated.addListener(function sendString(tabId, info, tab) {
					if (tabId == sender.tab.id) { // make sure correct tab

						// log info
						console.log(info);
						console.log(message.searchString);

						// construct message to be relayed
						var relay_msg = { 
							type: RELAYED_SEARCH_STRING_MSG, 
							searchString : message.searchString, 
							page : message.page,  
						};

						// send to the front tab, record sent message
						chrome.tabs.sendMessage(sender.tab.id, relay_msg);
						pages[sender.tab.id] = relay_msg;
						active_conn(relay_msg, sender.tab.id);


						// setTimeout(function() {
						// 	if (pages[sender.tab.id]) {
						// 		alert("hello!");
						// 		chrome.tabs.sendMessage(sender.tab.id, relayed_msg); 
						// 	}
						// }, 2000);


						// remove the listener when triggered
						chrome.tabs.onUpdated.removeListener(sendString);
					}
				});
				break;

			// check ofr badge update condition
			case SEARCH_RESULTS_MSG: 
				delete pages[sender.tab.id];
				console.log("deleted");
				badgeUpdate(sender.tab.id, message.result);
				break;
		}
	}
);
		
// chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
// 	if (info.url) { // url has changed, clear the badge
// 		badgeUpdate(tabId, "");
// 	}
// });

function badgeUpdate(id, msg) {
	if (msg == SEARCH_SUCCESS) {
		chrome.browserAction.setBadgeBackgroundColor({ color: GREEN, tabId:id});
	}

	if (msg == SEARCH_FAILURE) {
		chrome.browserAction.setBadgeBackgroundColor({ color: RED, tabId:id});
	}

	chrome.browserAction.setBadgeText({ text: msg , tabId : id});
	tab_badges[id] = msg;
}

	