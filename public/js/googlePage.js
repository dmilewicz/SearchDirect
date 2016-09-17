/**
 * Copyright (c) 2016 David Milewicz and Leon Wee
 *
 *
 *
 */


 $(document).ready(function() {



   // injectHyperlink();
   identifyMessage();
   // testing();

   // function testing() {
   //    console.log("Hello");
   // };

   function injectHyperlink(message) {
     // var textElement  = $(".quote").html();
     $('span.st').html(function(idx, html){
         return html.replace(message,'<a href="http://www.google.com">'+ message +'</a>');
     });
   };

   function identifyMessage() {
      // var textElement = $("span.st").html();
      var arraySpan = document.getElementsByClassName("st");

      for (var i = 0; i < arraySpan.length; i++) {
          injectHyperlink(arraySpan[i].innerHTML);
      };
      // var array = textElement.split(" ")
   };

   // function filterResultInserts(event) {
   //   console.log(event);
   // }

   // target.addEventListener('DOMNodeInserted', filterResultInserts);
 });
