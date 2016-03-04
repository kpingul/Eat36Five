(function() {
  'use strict';
  angular.module('VenueApp')
  .directive('venuePhotoGallery', venuePhotoGallery)

   function venuePhotoGallery(){

      var directive = {

        restrict: 'A',

        link: link

      };
      return directive;

      function link(scope, elem, attrs){
    
        elem.on('click', function(e) {
          //activate swipebox with venue photos
          //@params accepts an array of objects
          //with href and title properties
          $.swipebox(photoMixin(scope.venuePhotos));

        });        
          
      }
    }

     
    function photoMixin(photos) {
      var photoMixins = [],
          photoSize = 'original';
          
      photos.map( function(item, index) {

        //checks for user information since
        //not all users include a last name or firstName
        if(item.user.lastName){
          photoMixins.push({
            href: item.prefix + photoSize + item.suffix,
            title: item.user.firstName + ' ' + item.user.lastName
          });

        }else{

          photoMixins.push({
            href: item.prefix + photoSize + item.suffix,
            title: item.user.firstName
          });
        }

      });

      return photoMixins;
    }


  
}());