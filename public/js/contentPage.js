


varport = chrome.runtime.connect();



	
chrome.runtime.onMessage.addListener(
	function(request, sender) {
		alert("Recieved " + requet.type + "at content page" );
		
		if (request.type && (event.data.type == "RELAY_STRING")) {
			
			console.log(request);
			
	//		window.find(request.searchString);
	//		$("window").scrollTop($(":contains(\"" + request.searchString +"\"):eq(0)").offset().top);
			
			var stringContainers = $(":contains("+ request.searchString +")");
			console.log(stringContainers);
			
			$("window").scrollTop(stringContainers.height());
			
			// set the little number overlay to number of results.
			// display results by content 
		}
		
		
		
});

