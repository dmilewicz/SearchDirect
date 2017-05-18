

/*
 * This code is injected into the content page, which searches for the given string.
 *
 */





$.fn.findText = function(params){
    var phrases = params.query,
        ignorance = params.ignorecase;
    console.log(this[0]);
    wrapper = $(this);
    var source = wrapper.innerHTML;
    if (source === undefined) {
    	source = wrapper[0].innerHTML;
	}
    alert(source);

    selection_class_name = params.style;
    source = source.replace(/[\n|\t]+/gi, '');
    source = source.replace(/\s+/gi, ' ');
    source = source.replace(/> /gi, '>');
    source = source.replace(/(\w)</gi, function(m, w){return(w + " <");});

    phrases.forEach(function(str){

        var regexp = makeRegexp(str);
        source = source.replace(regexp, function (m){
            return (emulateSelection(m));
        });

    });

    wrapper.html(source);
    var res_array = wrapper.find("[search=xxxxx]")
    return(res_array);
};



function makeRegexp(s){
    var space = '( )?(<span[^>]*>)?(</span[^>]*>)?( )?';
    var result = s.replace(/\s/gi, space);
    result = new RegExp(space + result + space, "gi");
    return(result);
}

function emulateSelection (htmlPiece){
    htmlPiece = htmlPiece.replace(/(?!=>)[^><]+(?=<)/g, function(w){
        return(wrapWords(w));}
    );
    htmlPiece = htmlPiece.replace(/^[^><]+/, function(w){
        return(wrapWords(w));}
    );
    htmlPiece = htmlPiece.replace(/[^><]+$/, function(w){
        return(wrapWords(w));}
    );
    htmlPiece = htmlPiece.replace(/^[^><]+$/, function(w){
        return(wrapWords(w));}
    );

    return( htmlPiece );
}




function wrapWords(plainPiece){
    console.log("plain: " + plainPiece);
    var start = '<span search="xxxxx">',
        stop = '</span>';
    return(start + plainPiece + stop);
}








	
chrome.runtime.onMessage.addListener(
	function(request, sender) {
		// alert("Recieved " + request.type + " at content page" );
		
		if (request.type && (request.type == "RELAY_STRING")) {
			
			
			console.log(request);
			
	//		window.find(request.searchString);
//			$("window").scrollTop($(":contains(\"" + request.searchString +"\"):eq(0)").offset().top);
		
			// search for the string
			var elems = $(":contains(\"" + request.searchString + "\"):last");

			// get all elements including parents
			var stringContainers = $(":contains(\""+ request.searchString +"\")");
		
			// trim to the leaf elements
			var trimmedContainers = trimResults(stringContainers);
			
			
			chrome.runtime.sendMessage({ type: "BADGE_UPDATE", text : (trimmedContainers[0] != undefined)? trimmedContainers.length: 0});
		
			// log resuts
			// console.log("trimmed containers: ");
			// console.log(trimmedContainers);

			// find the requested string.
			// TODO: make a more robust finding algorithm
			$(trimmedContainers[0]).find(":contains('" + request.searchString + "')").css("background", "#6a5acd");

			
			// Scroll to
			$("window").scrollTop(stringContainers.height());


            $("html").findText({query: [request.searchString]}).each(function () {
            	console.log("finding text\n\n\ntrials")
                $(this).addClass("selection");

                console.log(this);
            });


		
			// Highlight
		
			// set the little number overlay to number of results.
			// display results by con
			// tent
		}
		
		
	}
);


function findString(string) {

}






function trimResults(results) {
	// create trimmed values array
	var trArr = [];
	
	//counter variable
	var i = 0;
	
	// add the leaf elements
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





