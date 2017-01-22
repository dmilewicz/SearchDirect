/**
 * Event page script for the SearchDirect Chrome Extension. The extension will send a message to the event page with the search string, and the 
 * string will be saved on this page. Upon the next page load, if there is a string in the event page it will be passed to the next page an search for the string will commence. 
 */

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
	  
//		alert("Recieved " + request.type + " at event page")
		if (request.type && (request.type == "REPORT_STRING")) {
			
			
			chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
				alert("live fire\n\n" +
						"tab ID: " + tabId + "\n\n" +
						"url: " + info.url + "\n\n"
						
						);
				identifyMessage();
				if (changeInfo.url == request.page ) {
					alert(info.url + "\n\n\n" + tabId);
					
					
					// send search string to content pages
					chrome.tabs.sendMessage(sender.tab.id, { type: "RELAY_STRING", searchString : request.searchString, page : request.page });	
					
					console.log(this);
					chrome.tabs.onUpdated.removeListener(this);
				}
			});
			
		}
//			var intervalId = setInterval(function () {
//		
//				chrome.tabs.getSelected( function (tab) {
//					
//					alert("tab url: " + tab.url + "\n\npage url: " + request.page);
//					
//					if (tab.url == request.page) {
//						alert(intervalId);
//						chrome.tabs.sendMessage(sender.tab.id, { type: "RELAY_STRING", searchString : request.searchString, page : request.page });	
//						clearInterval(intervalId);
//					}
//					
//				});
//				
//			}, 50);
//		}
	});







//		chrome.tabs.getSelected( function (tab) {
//			alert(tab.url);
//			if (tab.url == page.link) {
//				alert("target page");
//			}
//		});
	  
//		if (request.type && (request.type == "REPORT_STRING")) {
//	  chrome.tabs.sendMessage(sender.tab.id, {searchString: request.searchString});		  
			
//			setTimeout( function() {
//						
//				chrome.tabs.sendMessage(sender.tab.id, { type: "RELAY_STRING", searchString : request.searchString, page : request.page });	
//				chrome.browserAction.setBadgeText({text: "5" });
//			  
//			},3000);
//		}
//	  
	  
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
	  
	  
	  
	 