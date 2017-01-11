/**
 * Copyright (c) 2016 David Milewicz and Leon Wee
 *
 *
 *
 */


var port = chrome.runtime.connect();

window.addEventListener("message", function(event) {
  // We only accept messages from ourselves
  if (event.source != window)
    return;

  if (event.data.type && (event.data.type == "FROM_PAGE")) {
    console.log("Content script received: " + event.data.text);
    alert("form resubmitted");
  }
}, false);





 $(document).ready(function() {
	 	 
	 if (window.location.hostname == "www.google.com" ) {
		 identifyMessage();
	 }
 });

 
 	
   function identifyMessage() {
	      var arraySpan = document.getElementsByClassName("g");
	      
	      for (var i = 0; i < 10; i++) {
	          injectHyperlink(arraySpan[i]);
	  };
   };
   
   
   function injectHyperlink(message) {
	   console.log("running hyperlink injection");
	   
	   // get link to next page 
	   var link = message.getElementsByClassName("r")[0].getElementsByTagName("a")[0].href;
	   
	   // get result contents 
	   var stContent = message.getElementsByClassName("st")[0];
	   
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
	   var contentFragments = stText.split("...");
	   
	   // add href links
	   for (var i = 0; i < contentFragments.length; i++) {
		   console.log(contentFragments[i]);
		   newContent += "<a onmousedown=\"(function(e, obj) {alert(obj.innerText);}) (event, this)\" href=\"" + link + "\">" + contentFragments[i] + "</a>";
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
   
   

   // function filterResultInserts(event) {
   //   console.log(event);
   // }

   // target.addEventListener('DOMNodeInserted', filterResultInserts);
 
