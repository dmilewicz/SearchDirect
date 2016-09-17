/**
 * Copyright (c) 2016 David Milewicz and Leon Wee
 * 
 * 
 * 
 */
 
 
var elementsWithString = [];

var currentElementIndex = 0;

var testString = "is"
 
 
 $(document).ready(function() {
    //var stringOfInterest = getCookie(SearchString);
    
    DOMSearch(testString);
    
     
    });
 
 
 
 
 
 
 
 
 
function DOMSearch(stringOfInterest) {
     
    //store elements with strings
    elementsWithString = $("*:contains(stringOfInterest)");
    
    console.log(elementsWithString);
     
    //use jquery function to scroll to first captured element
    $(window).scrollTop(elementsWithString[CurrentElementIndex].offset().top);
    
    
    
    return(elementsWithString);
}
 
 
function scrollToNext() {
    if (currentElementIndex + 1 < elementsWithString.length) {
        currentElementIndex++;
        $(window).scrollTop(elementsWithString[CurrentElementIndex].offset().top);
    }
}


 
 
 //highlighter script taken from http://james.padolsey.com/javascript/highlighting-text-with-javascript/
 // highlights the first match
function highlight(container,what,spanClass) {
    //Get inner content variable
    var content = container.innerHTML,
        //match pattern
        pattern = new RegExp('(>[^<.]*)(' + what + ')([^<.]*)','g'),
        
        replaceWith = '$1<span ' + ( spanClass ? 'class="' + spanClass + '"' : '' ) + '">$2</span>$3',
        
        highlighted = content.replace(pattern,replaceWith);
    //return tru
    return (container.innerHTML = highlighted) !== content;
}
 
 
 
 
 
 
 
 
 
 
 function getCookie(cookieName) {
    // taken from http://www.w3schools.com/js/js_cookies.asp
    var name = cookieName + "=";
    
    //create cookie array
    var cookieList = document.cookie.split(';');
    
    //
    for(var i = 0; i <cookieList.length; i++) {
        var c = cookieList[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }
    return "";
}