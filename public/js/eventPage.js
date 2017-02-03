/**
 * Event page script for the SearchDirect Chrome Extension. The extension will send a message to the event page with the search string, and the 
 * string will be saved on this page. Upon the next page load, if there is a string in the event page it will be passed to the next page an search for the string will commence. 
 */

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
	  
//		alert("Recieved " + request.type + " at event page")
		if (request.type && (request.type == "REPORT_STRING")) {
			
			
			chrome.tabs.onUpdated.addListener(function sendString(tabId, info, tab) {				
//				var t;
//				
//				if ()
//				
//				identifyMessage();
				if (info.url === request.page && tabId == sender.tab.id ) {
					alert("Made it to content page\n\n" + info.url + "\n\n\n" + tabId + "\n\n\nSending message...");
					
					
					// send search string to content pages
					chrome.tabs.sendMessage(sender.tab.id, { type: "RELAY_STRING", searchString : request.searchString, page : request.page });	
					
					console.log(this);
					chrome.tabs.onUpdated.removeListener(sendString);
				}
			});
			
		} else if(request.type && (request.type == "BADGE_UPDATE")) {
			alert("Received badge changed");
			chrome.browserAction.setBadgeText({text: request.text.toString() });
		} else if(request.type && (request.type == "AT_GOOGLE")) {
			alert("At Google");
			var prevHash = "";
			chrome.tabs.onUpdated.addListener(function reportGoogle(tabId, info, tab) {
				alert("At Google. Created Event Listener: \n\n" + info.url + "\n\n + tabId");
				
				if (request.hash != prevHash && request.hash != undefined && tabId == sender.tab.id) {
					prevHash == 
					alert("Event listener fired for google change");
					
				} else if()
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
	  
	  
	  
	 