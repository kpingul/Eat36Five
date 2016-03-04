(function() {
 'use strict';
 angular.module('VenueApp')
 .value('slickBreakpoints', { 
    breakpoints: 
            [
              {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                
                  dots: false
                }
              },
              {
                breakpoint: 800,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  arrows: false,
                  dots: false
                }
              },
              {
                breakpoint: 480,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
              arrows: false,
               dots: false
                }
              }

            ]//end of breakpoints
  })
  
}());