/**
 * Copyright (c) 2016 David Milewicz and Leon Wee
 *
 *
 *
 */


 $(document).ready(function() {

   // $(".quote").append("HIHIHIHIHI");

   injectHyperlink();

   function injectHyperlink() {
     // var textElement  = $(".quote").html();
     $('.quote').html(function(idx, html){
         return html.replace(/sentiment/g, '<a href="http://www.google.com">sentiment</a>')
     })
   };

   function identifyMessage() {

   };
 });
