





	
chrome.runtime.onMessage.addListener(
	function(request, sender) {
		alert("Recieved " + request.type + " at content page" );
		
		if (request.type && (request.type == "RELAY_STRING")) {
			
			
			console.log(request);
			
	//		window.find(request.searchString);
//			$("window").scrollTop($(":contains(\"" + request.searchString +"\"):eq(0)").offset().top);
		
			
			var elems = $(":contains(\"" + request.searchString + "\"):last"); 
		
	
		
			// get all elements including parents
			var stringContainers = $(":contains(\""+ request.searchString +"\")");
		
			// trim to the leaf elements
			var trimmedContainers = trimResults(stringContainers);
			
			
			chrome.runtime.sendMessage({ type: "BADGE_UPDATE", text : (trimmedContainers[0] != undefined)? trimmedContainers.length: 0});
		
			// log resuts
			console.log(trimmedContainers);
			
			$(trimmedContainers[0]).find(":contains('" + request.searchString + "')").css("background", "#6a5acd");

			
			// Scroll to
			$("window").scrollTop(stringContainers.height());
		
			// Highlight
		
			// set the little number overlay to number of results.
			// display results by content 
		}
		
		
	}
);


function trimResults(results) {
	// create  return array 
	var trArr = [];
	
	//counter variable
	var i = 0;
	
	//
	while (results[i+1] != undefined) {
		// add all leaf elements to the new array 
		if (results[i + 1].parentNode != results[i]) {
			trArr.push(results[i]);
		} 
		i++;
	} 
	// add last leaf
	trArr.push(results[i]);
	
	//return array
	return trArr;
}





