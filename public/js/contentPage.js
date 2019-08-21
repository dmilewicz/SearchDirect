/* 
 * David Milewicz
 * This code is injected into the content page, which searches for the given string.
 * 
 */

var lastfind;


chrome.runtime.onMessage.addListener(
	function(request, sender) {    
        
		if (request.type && (request.type == RELAYED_SEARCH_STRING_MSG)) {
			console.log(request);
        }

        if (document.readyState == "loaded" || document.readyState == "interactive" || document.readyState == "complete") {
            directSearch(request);
        }
        else {
            document.addEventListener("DOMContentLoaded", function() {
                directSearch(request);
            });
        }

        lastfind = request;

        return true;
    }
);

/*
 * Run a search using the given request. 
 *
 * @param request - object containing the following fields
 *          searchString: string to search for in the page
 *          
 */
function directSearch(request) {
    if (request == undefined) {
        return
    }

    var result;

    // attempt to find results
    try {
        result = runFind(request.searchString);
    } catch(err) {
        console.log("ERROR: ", err);
    }
    
    console.log("result: ", result);

    // check if results found
    if (result.reverts.length > 0) {
        // report search success
        chrome.runtime.sendMessage({ type: SEARCH_RESULTS_MSG,  result: SEARCH_SUCCESS}); //count: result.reverts.length });

        // retrieve text location
        var text_bounding_rect = $(".selection")[0].getBoundingClientRect();

        // log text location
        console.log(text_bounding_rect);

        // scroll to the text
        window.scrollTo({
            left: 0, 
            top: text_bounding_rect.top - (window.innerHeight * .3), 
            behavior: "smooth"
        });

    } else {
        // Look for the string in the header -- no processing at the moment
        headResult = document.head.innerHTML.search(processString(request.searchString));
        
        // check if found string in header
        if (headResult >= 0) {
            chrome.runtime.sendMessage({ type: SEARCH_RESULTS_MSG,  result: SEARCH_HEADER });
        } else {
            chrome.runtime.sendMessage({ type: SEARCH_RESULTS_MSG,  result: SEARCH_FAILURE });
        }
    }
}

/*
 * Encapulates processing for a given search string. 
 */
function processString(searchString) {
    // regex to designate what constitutes acceptable characters between words
    var whitespace = "[\\n\\r\\s]*";

    return searchString.trim()
                       .replace(new RegExp(" ", "g"), whitespace) // unify whitespace
                       .replace(/[(){}$"^?]/g, '\\$&') // escape characters
                       .replace(/[.]/g, '\\$&?') // make periods optional
                       .replace(/[']/g, '(’|\')'); // match right single quotation mark to apostrophe
}

/*
 * 
 */
function runFind(searchString, domain=document.body) {
    return findAndReplaceDOMText(domain, {
        find: new RegExp(processString(searchString), "g"),
        wrap: 'em',
        wrapClass: 'selection'
    });
}

