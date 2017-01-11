/**
 * Copyright (c) 2016 David Milewicz and Leon Wee
 *
 *
 *
 */


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
//		   alert(fContent);
		   newContent += fContent.outerHTML;
		   stContent.removeChild(fContent);
//		   fText = stText.replace(fContent, '');
	   } 
	   
	   var stText = stContent.innerHTML;
	    
	    
	   // split by elipsis
	   var contentFragments = stText.split("...");
	   
	   for (var i = 0; i < contentFragments.length; i++) {
		   console.log(contentFragments[i]);
		   newContent += "<a href=\"" + link + "\">" + contentFragments[i] + "</a>";
	   }
	   
	   
	   // refill element content
	   stContent.innerHTML = newContent;

   };
   
   
   function saveText() {
	   
   }
   
   

   // function filterResultInserts(event) {
   //   console.log(event);
   // }

   // target.addEventListener('DOMNodeInserted', filterResultInserts);
 
