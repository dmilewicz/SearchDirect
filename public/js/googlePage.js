/**
 * Copyright (c) 2016 David Milewicz and Leon Wee
 *
 *
 *
 */


 $(document).ready(function() {

   // $(".quote").append("HIHIHIHIHI");

   injectHyperlink();
   identifyMessage();

   function injectHyperlink() {
     // var textElement  = $(".quote").html();
     $('.quote h1').html(function(idx, html){
         return html.replace(identifyMessage(),'<a href="http://www.google.com">'+ identifyMessage() +'</a>');
     });
   };

   function identifyMessage() {
      var textElement = $(".quote h1").html();
      // var array = textElement.split(" ")
      return textElement;
   };
 });
