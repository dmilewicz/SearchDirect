// $(document).ready(function() {

//   // $(".quote").append("HIHIHIHIHI");

//   extractWords();

//   function extractWords() {
//     var textElement  = $(".quote").html();
//     console.log(textElement);
//   };
// });




$(document).ready(function() {
	console.log("running query");
	chrome.storage.sync.get(null, function (obj) {
		if (obj != undefined) {
			console.log(obj);
		}
	});


});

