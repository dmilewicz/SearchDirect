/**
 * Copyright (c) 2016 David Milewicz and Leon Wee
 *
 *
 *
 */


varport = chrome.runtime.connect();

window.addEventListener("hashchange", function() {alert("changed");}, false);

// add listener for the text message from page
window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + event.data.text);
    
    if (event.data.text !== undefined) {
    	console.log("running message send ... ");
    	chrome.runtime.sendMessage({ searchString : event.data.text });
    	console.log("message sent");
    }
    
    
  }
}, false);

//console.log(document);

//var ajaxContent = document.getElementById("ires");
//ajaxContent.addEventListener("load", function() {alert('yello yes');}, false);

var onMouseDownEvent = "onmousedown=\"(function(e, obj) { window.postMessage( { type: 'FROM_PAGE', text: obj.innerText } , '*')}) (event, this)\""; 


$(document).ready(function() {
	 	
	if (window.location.hostname == "www.google.com" ) {
		 // call the function to inject hyperlinks		 
//		 setTimeout(identifyMessage, 1000);
		
//		$(".g").load(identifyMessage);
		
		if (window.location.pathname === "/search") {
			identifyMessage();
		} else {
			console.log("/webhp");
			setTimeout( identifyMessage, 1000);
		}
		
		
		
		
		
		
//		 var ajaxContent = document.getElementById("ires");
//		 ajaxContent.addEventListener("load", function() {alert('yes');});
//		 console.log(ajaxContent);
		 
		 
		 
		 
//		 newSearch = document.getElementById("tsf");
//		 console.log("adding event listener...");
//		 newSearch.onsubmit = function () {alert("tried again")};
//		 newSearch.addEventListener("submit", saveText, false);
//		 console.log("done");
		 
	}
});

 
 	
function identifyMessage() {
	
	var arraySpan = document.getElementsByClassName("g");
	
//	while (arrayspan[i] == undefined) {
//		setTimeout(function(arraySpan) { arraySpan = document.getElementsByClassName("g"); }, 10, arraySpan);
//	}
	    
//		while (arraySpan[i] == undefined) {
//			console.log("check");
//			arraySpan = document.getElementsByClassName("g");
//		}
	
	if (arraySpan == undefined) {
		console.log("failed to retrieve the search results");
		return;
	} else {
		for (var i = 0; i < 10; i++) {
			injectHyperlink(arraySpan[i]);
		}
	}
};





   
   
function injectHyperlink(message) {
	   
	var titleElement = message.getElementsByClassName("r")[0];
	   
	if (titleElement === undefined) {
		return;
	}
	   
	// get link to next page 
	var link = titleElement.getElementsByTagName("a")[0].href;
	   
	// get result contents 
	var stContent = message.getElementsByClassName("st")[0];
	
	if (stContent === undefined) {
		console.log("No stContent found at element");
		return;
	}
	
	// get result date if present
	var fContent = stContent.getElementsByClassName("f")[0];
	   
	// create new html string
	var newContent = "";
	   
	// if present add the date to the new HTML string
	if (fContent !== undefined) {
		newContent += fContent.outerHTML;
		stContent.removeChild(fContent);
	   } 
	   
	// get relevant text from the webpage
	var stText = stContent.innerHTML;
	     
	
	
	// split by elipsis
	var contentFragments = stText.split(/\s?\.\.+\s?/);
	   
	// add href links
	for (var i = 0; i < contentFragments.length; i++) {
		newContent += "<a " + onMouseDownEvent + " style=\"color: inherit; text-decoration: none;\" href=\"" + link + "\">" + contentFragments[i] + "</a>";
		if (i != (contentFragments.length - 1)) {
			newContent += "...";
		}
	}
	   
	// refill element content
	stContent.innerHTML = newContent;

};
   
   
function saveText() {
	alert("hello");
}
   
   
 
