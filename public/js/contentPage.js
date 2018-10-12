/* 
 * David Milewicz
 * This code is injected into the content page, which searches for the given string.
 * 
 */

// var observer = new MutationObserver(function(mutations, observer) {
//     try {
//         result = runFind(request.searchString);
//     } catch(err) {
//         console.log("ERROR");
//     }
    
//     console.log("result: ", result);

//     if (result.reverts.length > 0) {
//         chrome.runtime.sendMessage({ type: BADGE_UPDATE_MSG,  count:"✔"}); //count: result.reverts.length });
//         console.log($(".selection")[0].getBoundingClientRect());

//         var foundElement = $(".selection")[0].getBoundingClientRect().top;
//         window.scrollTo(0, $(".selection")[0].getBoundingClientRect().top - (window.innerHeight * .3));
//     } else {
//         // Look for the string in the header -- no processing at the moment
//         headResult = document.head.innerHTML.search(processString(request.searchString));

//         if (headResult >= 0) {
//             chrome.runtime.sendMessage({ type: BADGE_UPDATE_MSG,  count: "#" });
//         } else {
//             chrome.runtime.sendMessage({ type: BADGE_UPDATE_MSG,  count: "!" });
//         }
//     }
// });



chrome.runtime.onMessage.addListener(

	function(request, sender) {    
        
		if (request.type && (request.type == RELAYED_SEARCH_STRING_MSG)) {

			console.log(request);
        }

        document.addEventListener("DOMContentLoaded", function() {

            var result;

            try {
                result = runFind(request.searchString);
            } catch(err) {
                console.log("ERROR: ", err);
            }
            
            console.log("result: ", result);
            var badgeResult = "";

        
            if (result.reverts.length > 0) {
                chrome.runtime.sendMessage({ type: BADGE_UPDATE_MSG,  count:SEARCH_SUCCESS}); //count: result.reverts.length });
                console.log($(".selection")[0].getBoundingClientRect());
        
                var foundElement = $(".selection")[0].getBoundingClientRect().top;
                window.scrollTo(0, $(".selection")[0].getBoundingClientRect().top - (window.innerHeight * .3));
            } else {
                // Look for the string in the header -- no processing at the moment
                headResult = document.head.innerHTML.search(processString(request.searchString));
                
                if (headResult >= 0) {
                    chrome.runtime.sendMessage({ type: BADGE_UPDATE_MSG,  count: SEARCH_HEADER });
                } else {
                    chrome.runtime.sendMessage({ type: BADGE_UPDATE_MSG,  count: SEARCH_FAILURE });
                }
            }
        });
    }
);

function processString(searchString) {
    // regex to designate what constitutes acceptable characters between words
    var whitespace = "[\\n\\r\\s]*";

    return searchString.trim()
                       .replace(new RegExp(" ", "g"), whitespace) // unify whitespace
                       .replace(/[()$^?]/g, '\\$&') // escape characters
                       .replace(/[.]/g, '\\$&?') // make periods optional
                       .replace(/[']/g, '(’|\')'); // match right single quotation mark to apostrophe
}

function runFind(searchString, domain=document.body) {
    return findAndReplaceDOMText(domain, {
        find: new RegExp(processString(searchString), "g"),
        wrap: 'em',
        wrapClass: 'selection'
    });
}

