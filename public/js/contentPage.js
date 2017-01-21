





	
chrome.runtime.onMessage.addListener(
	function(request, sender) {
		console.log(request);
		
//		window.find(request.searchString);
//		$("window").scrollTop($(":contains(\"" + request.searchString +"\"):eq(0)").offset().top);
		
		var stringContainers = $(":contains("+ request.searchString +")")
		
		// set the little number overlay to number of results.
		// display results by 
		
});

