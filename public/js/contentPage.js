





	
chrome.runtime.onMessage.addListener(
	function(request, sender) {
		alert("Recieved " + request.type + " at content page" );
		
		if (request.type && (request.type == "RELAY_STRING")) {
			
			
		console.log(request);
			
	//		window.find(request.searchString);
	//		$("window").scrollTop($(":contains(\"" + request.searchString +"\"):eq(0)").offset().top);
			
		var stringContainers = $(":contains(\""+ request.searchString +"\")");
		console.log({result : stringContainers});
			
		$("window").scrollTop(stringContainers.height());
			
			// set the little number overlay to number of results.
			// display results by content 
		}
		
		
	}
);

