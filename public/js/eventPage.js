/**
 * Event page script for the SearchDirect Chrome Extension. The extension will send a message to the event page with the search string, and the 
 * string will be saved on this page. Upon the next page load, if there is a string in the event page it will be passed to the next page an search for the string will commence. 
 */

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	  
	  
	  

//	  chrome.tabs.sendMessage(sender.tab.id, {searchString: request.searchString});	

	  
	  
	  setTimeout( function() {

		  chrome.tabs.sendMessage(sender.tab.id, request);	
		  chrome.browserAction.setBadgeText("8");
		  
	  }, 5000);
	  
	  
//	  {searchString: request.searchString, page:resquest.page}
	  
//	  chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
//		  
//		  alert("hello!");
//		  alert(tabId);
//		  
//		  
//		  if (info.status == "complete") {
//			  chrome.tabs.sendMessage(tab.id, {searchString: "hit!"});		  
//		  }
//	  });
	  
	  
	  
	  

  });