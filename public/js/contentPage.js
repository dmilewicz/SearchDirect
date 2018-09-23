/* 
 * David Milewicz
 * This code is injected into the content page, which searches for the given string.
 * 
 */

var observer = new MutationObserver(function(mutations, observer) {
    try {
        result = runFind(request.searchString);
    } catch(err) {
        console.log("ERROR");
    }
    
    console.log("result: ", result);

    if (result.reverts.length > 0) {
        chrome.runtime.sendMessage({ type: BADGE_UPDATE_MSG,  count:"✔"}); //count: result.reverts.length });
        console.log($(".selection")[0].getBoundingClientRect());

        var foundElement = $(".selection")[0].getBoundingClientRect().top;
        window.scrollTo(0, $(".selection")[0].getBoundingClientRect().top - (window.innerHeight * .3));
    } else {
        // Look for the string in the header -- no processing at the moment
        headResult = document.head.innerHTML.search(processString(request.searchString));

        if (headResult >= 0) {
            chrome.runtime.sendMessage({ type: BADGE_UPDATE_MSG,  count: "#" });
        } else {
            chrome.runtime.sendMessage({ type: BADGE_UPDATE_MSG,  count: "!" });
        }
    }
});

// regex to designate what constitutes acceptable characters between words
var whitespace = "[\\n\\r\\s]*";

// String with all the characters that should be escaped in it
var escapeCharacters = "()";


chrome.runtime.onMessage.addListener(

    
	function(request, sender) {        
		if (request.type && (request.type == RELAYED_SEARCH_STRING_MSG)) {
			console.log(request);
        }

        document.addEventListener("DOMContentLoaded", function() {

            // observer.observe(document, {
            //     childList : true,
            //     characterData : true
            // });
            // alert("ran");

            try {
                result = runFind(request.searchString);
            } catch(err) {
                console.log("ERROR: ", err);
            }
            
            console.log("result: ", result);
            var badgeResult = "";
        
            if (result.reverts.length > 0) {
                chrome.runtime.sendMessage({ type: BADGE_UPDATE_MSG,  count:"✔"}); //count: result.reverts.length });
                console.log($(".selection")[0].getBoundingClientRect());
        
                var foundElement = $(".selection")[0].getBoundingClientRect().top;
                window.scrollTo(0, $(".selection")[0].getBoundingClientRect().top - (window.innerHeight * .3));
            } else {
                // Look for the string in the header -- no processing at the moment
                headResult = document.head.innerHTML.search(processString(request.searchString));
        
        
                if (headResult >= 0) {
                    chrome.runtime.sendMessage({ type: BADGE_UPDATE_MSG,  count: "#" });
                } else {
                    chrome.runtime.sendMessage({ type: BADGE_UPDATE_MSG,  count: "!" });
                }
            }

            // chrome.tabs.getCurrent(function(tab) {
            //     chrome.tabs.onActivated.addListener(function(activeInfo) {
            //         if (tab.id == activeInfo.tabId) {
            //             chrome.runtime.sendMessage({ type: BADGE_UPDATE_MSG,  count: "s" });
            //         }
            //     });
            // });

           
        });
    }
);

function processString(searchString) {
    return searchString.trim()
                       .replace(new RegExp(" ", "g"), whitespace) // unify whitespace
                       .replace(/[()$^*?]/g, '\\$&') // escape characters
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




// function doSearch(text) {
//   var found = 0;

//   if (window.find && window.getSelection) {
//     document.designMode = "on";
//     var sel = window.getSelection();
//     sel.collapse(document.body, 0);

//     while (window.find(text)) {
//       document.execCommand("HiliteColor", false, "yellow");
//       sel.collapseToEnd();
//       found++;
//     }
//     document.designMode = "off";
//   } else if (document.body.createTextRange) {
//     var textRange = document.body.createTextRange();
//     while (textRange.findText(text)) {
//       textRange.execCommand("BackColor", false, "yellow");
//       textRange.collapse(false);
//       found++
//     }
//   }

//   return found;
// }













// function trimResults(results) {
// 	// create trimmed values array
// 	var trArr = [];
	
// 	//counter variable
// 	var i = 0;
	
// 	// add the leaf elements
// 	while (results[i+1] != undefined) {
// 		// add all leaf elements to the new array 
// 		if (results[i + 1].parentNode != results[i]) {
// 			trArr.push(results[i]);
// 		} 
// 		i++;
// 	} 
// 	// add last leaf
// 	trArr.push(results[i]);
	
// 	//return array
// 	return trArr;
// }




// CODE GRAVEYARD
// from add listener:

//			$("window").scrollTop($(":contains(\"" + request.searchString +"\"):eq(0)").offset().top);

// search for the string
// var elems = $(":contains(\"" + request.searchString + "\"):last");

// get all elements including parents
// var stringContainers = $(":contains(\"" + request.searchString + "\")");

// trim to the leaf elements
// var trimmedContainers = trimResults(stringContainers);


// chrome.runtime.sendMessage({
//   type: "BADGE_UPDATE",
//   text: (trimmedContainers[0] != undefined) ? trimmedContainers.length : 0
// });

// log resuts
// console.log("trimmed containers: ");
// console.log(trimmedContainers);


// find the requested string.
// TODO: make a more robust finding algorithm
// $(trimmedContainers[0]).find(":contains('" + request.searchString + "')").css("background", "#6a5acd");

// Scroll to
// $("window").scrollTop(stringContainers.height());



// 'this' parameter of this function is

// $.fn.findText = function (params) {

//     var phrases = params.query,
//         ignorance = params.ignorecase;
//     wrapper = $(this);

//     debug_log("findText: Wrapper: ");
//     debug_log(wrapper);

//     var source = wrapper.html();

//     selection_class_name = params.style;
//     source = source.replace(/[\n|\t]+/gi, '');
//     source = source.replace(/\s+/gi, ' ');
//     source = source.replace(/> /gi, '> ');
//     source = source.replace(/(\w)</gi, function (m, w) {
//         return (w + " <");
//     });

//     var debug_count = 1;
//     phrases.forEach(function (str) {

//         debug_log("findtext: phrase " + debug_count++ + ": \n" + str);

//         var regexp = makeRegexp(str);
//         source = source.replace(regexp, function (m) {
//             return (emulateSelection(m));
//         });

//     });

//     wrapper.html(source);
//     var res_array = wrapper.find("[search=xxxxx]");
//     return (res_array);
// };



// function doSearch(text) {
//   debug_log("doSearch: Starting doSearch search");
//   if (window.find && window.getSelection) {
//     debug_log("doSearch: entering first if");
//     document.designMode = "on";
//     var sel = window.getSelection();
//     sel.collapse(document.body, 0);
//     debug_log("doSearch: selection: ");
//     debug_log(sel);
//     var debug_count = 1;
//     while (window.find(text)) {
//       debug_log("doSearch: found match " + debug_count++);
//       document.execCommand("HiliteColor", false, "yellow");
//       sel.collapseToEnd();
//     }
//     document.designMode = "off";
//   } else if (document.body.createTextRange) {
//     debug_log("doSearch: entering second if");
//     var textRange = document.body.createTextRange();
//     while (textRange.findText(text)) {
//       textRange.execCommand("BackColor", false, "yellow");
//       textRange.collapse(false);
//     }
//   }
// }


// function makeRegexp(s) {
//     var space = '( )?(<(/)?span[^>]*>)*( )?';
//     var result = s.replace(/\s/gi, space);
//     result = new RegExp(space + result + space, "gi");

//     debug_log("Regexp generated: \n");
//     debug_log(result);

//     return (result);
// }


// function emulateSelection(htmlPiece) {
//     htmlPiece = htmlPiece.replace(/(?!=>)[^><]+(?=<)/g, function (w) {
//         return (wrapWords(w));
//     });
//     htmlPiece = htmlPiece.replace(/^[^><]+/, function (w) {
//         return (wrapWords(w));
//     });
//     htmlPiece = htmlPiece.replace(/[^><]+$/, function (w) {
//         return (wrapWords(w));
//     });
//     htmlPiece = htmlPiece.replace(/^[^><]+$/, function (w) {
//         return (wrapWords(w));
//     });

//     return (htmlPiece);
// }



// function wrapWords(plainPiece) {
//     console.log("plain: " + plainPiece);
//     var start = '<span search="xxxxx">',
//         stop = '</span>';
//     return (start + plainPiece + stop);
// }


// var searchString;

// function textNodesUnder(node){
//     var all = '';
//     for (node=node.firstChild;node;node=node.nextSibling){
//         console.log(node)
//         console.log(node.nodeType)
//       if (node.nodeType==3) {
//           console.log(node.textContent)
//           all = all + node.textContent;
//       }
//       else {
//           all = all + textNodesUnder(node);
//       }
//     }
//     return all;
//   }

//   function textNodesUnder2(el){
//     var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
//     while(n=walk.nextNode()) a.push(n);
//     return a;
//   }



    //   $(document).ready()
    //   {

    //     debug_log("RELAYED_SEARCH_STRING_MSG::logging the page")
    //     debug_log($("html"));

    //     var searchQuery = {query: [request.searchString]};

    //     debug_log("RELAYED_SEARCH_STRING_MSG::" + searchQuery);

    //     results = doSearch(request.searchString);

    //     debug_log("CONTENT_PAGE: Done running doSearch");

    //     if (results > 0) {
    //       chrome.runtime.sendMessage({type: "BADGE_UPDATE", text: results});
    //       debug_log("CONTENT_PAGE: found " + results + " occurences of the string in the page");
    //       return;
    //     }
    //     else {
    //       debug_log("CONTENT_PAGE: No results found via window.find");
    //     }


        // var sectionsContainingText = $("html").findText({query: [request.searchString]});


        // if (sectionsContainingText == null) {
        //   error_log("CONTENT_PAGE: sections containing text not found");
        //   return;
        // }

        // sectionsContainingText.each(
        //     function () {
        //         if (this === null) { // check if nothing found
        //             alert("block successful, null found");
        //             return;
        //         }

        //         alert("found something \n" + this);
        //         $(this).addClass("selection");
        //     }
        // );