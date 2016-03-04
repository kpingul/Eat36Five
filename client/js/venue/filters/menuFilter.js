(function() {
  'use strict';
  angular.module('VenueApp')
  .filter('menufilter', menufilter)
   function menufilter(){

    return function(value){

      var menu = [];

      if(value){

        menu  = value.filter( function( item, index) {

            if(item.name === "Menus"){
              return item;
            }
            if(item.name === "Drinks"){
              return item;
            }
        });
    
        return menu;
      }
    

    };


  }
  
}());