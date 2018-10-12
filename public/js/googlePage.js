/**
 * Copyright (c) 2016 David Milewicz
 *
 * This code is executed every
 *
 */





var onMouseDownEvent = "class=\"addedLink\"";

MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

$(function() {
	console.log("running identify...");
    identifyMessage();
});

var counter = 0
var observer = new MutationObserver(function(mutations, observer) {
    console.log(mutations);
	console.log("running identify " + counter);
	

    identifyMessage();
});

// define what element should be observed by the observer
// and what types of mutations trigger the callback
observer.observe($("#gsr").get(0), {
	childList : true,
	characterData : true

});


function identifyMessage() {
	
	var arraySpan = document.getElementsByClassName("g");
	
	$(".g").each(function(i, obj) {
		injectHyperlink(obj);
	});
};




/*
 * Injects a hyperlink into the HTML of the given google HTML element. Currently this element
 * should be a 'g' class element.
 * @param message
 *
 */
function injectHyperlink(message) {
	
	if (message === undefined) { 
		console.log("g class element undefined");
		return; 
	}
	
	var titleElement = message;
	
	if (titleElement === undefined) {
		return;
	}
	   
	// get link to next page 
	var link = titleElement.getElementsByTagName("a")[0].href;
	   
	// get result contents 
	var stContent = message.getElementsByClassName("st")[0];
	
	if (stContent === undefined) {
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
		if (i != (contentFragments.length - 1) && contentFragments[i] != "") {
			newContent += "...";
		}
	}
	   
	// refill element content
	stContent.innerHTML = newContent;

	$(".addedLink").off().on('mousedown', function() {
		// debug_log("GOOGLE_PAGE: Sending messsage to event page. message:\n" + this.innerText);
		chrome.runtime.sendMessage({ type: SEARCH_STRING_MSG, searchString : this.innerText , page : this.href });
	});
};
   
   
