/**
 * Event page script for the SearchDirect Chrome Extension. The extension will send a message to the event page with the search string, and the 
 * string will be saved on this page. Upon the next page load, if there is a string in the event page it will be passed to the next page an search for the string will commence. 
 */

// dict to hold the tab icon states
var tab_badges = {};

// dict for holding the active page info
var pages = {}

/*
 *
 */
function active_conn(msg, tabId) {
    // alert("running!");
    if (tabId in pages) {
        console.log("once");
        chrome.tabs.sendMessage(tabId, msg); 
        setTimeout(function(){ active_conn(msg, tabId); }, 500);

    } else {
        console.log("err not found");
        // no more calls
        return
    }
}


chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {

        debug_log("Recieved " + message.type + " at event page");

        // This means something I don't remember what
        if (!message.type) {
            debug_log("ERR: No type");
            return;
        }

        switch (message.type) {
            // receive serch string from Google page
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
                        
                        // add 
                        pages[sender.tab.id] = relay_msg;
                        active_conn(relay_msg, sender.tab.id);
                        
                        // remove the listener when triggered
                        chrome.tabs.onUpdated.removeListener(sendString);
                    }
                });
                break;

            // received search results from the content page
            case SEARCH_RESULTS_MSG: 
                // remove from list of active connections
                delete pages[sender.tab.id];
                console.log("deleted");

                // update the badge 
                badgeUpdate(sender.tab.id, message.result);
                break;
        }
    }
);

/*
 * Update the badge state
 * @param id the chrome tab ID
 * @param msg status text to display on chrome
 */
function badgeUpdate(id, msg) {
    if (msg == SEARCH_SUCCESS) {
        chrome.browserAction.setBadgeBackgroundColor({ color: GREEN, tabId:id});
    }

    if (msg == SEARCH_FAILURE) {
        chrome.browserAction.setBadgeBackgroundColor({ color: RED, tabId:id});
    }

    // Set text according to results
    chrome.browserAction.setBadgeText({ text: msg , tabId : id});
}
