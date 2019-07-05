jQuery(function ($) {

    'use strict';

    // --------------------------------------------------------------------
    // Back to top
    // --------------------------------------------------------------------

    (function() {

        var swiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            spaceBetween: 30,
            centeredSlides: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });


        var offset = 220;
        var duration = 500;
        jQuery(window).scroll(function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery('.crunchify-top').fadeIn(duration);
            } else {
                jQuery('.crunchify-top').fadeOut(duration);
            }
        });
 
        jQuery('.crunchify-top').click(function(event) {
            event.preventDefault();
            jQuery('html, body').animate({scrollTop: 0}, duration);
            return false;
        })

    }());


    // --------------------------------------------------------------------
    // Owl Carousel Video Slider
    // --------------------------------------------------------------------

    (function() {
     $('.owl-carousel').owlCarousel({
         loop:true,
         margin:30,
         nav:true,
         responsive:{
             0:{
                 items:1
             },
             600:{
                 items:2
             },
             1000:{
                 items:3
             }
         }
        });

     }());

}); // JQuery end
