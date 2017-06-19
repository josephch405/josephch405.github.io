 $(document).scroll(function() {
     if ($(this).scrollTop() > window.innerHeight * .6) {
         $("#logo").addClass("mini");
     } else {
         $("#logo").removeClass("mini");
     }
 })