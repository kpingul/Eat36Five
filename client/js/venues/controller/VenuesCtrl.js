(function() {
  'use strict';
    angular.module('VenuesApp')
      .controller('VenuesCtrl', VenuesCtrl)

      //Inject the dependencies to the Venues Controller
      VenuesCtrl.$inject = ['$scope', '$timeout', 'MapService'];
      
      function VenuesCtrl($scope, $timeout, MapService){
        var vm = this;

        vm.venueFilter    = true;
        vm.sortType       = "";
        vm.searchType     = "";
        vm.searchName     = "";
        vm.venueLimit     = 5;
        vm.loadMoreVenue  = false;
        vm.toggleVenues   = false;
        vm.venues         = venuesData;
        MapService.getSearchVenueMap(vm.venues);
        vm.allMarkers     = MapService.getAllMarkers();

        // Returns a duplicate of val 
        //(x) amount of times
        vm.duplicate = function(strVal, times){
          var dupValue = "",
              i   = 0;

          for( i; i < times; i += 1 ){
            dupValue += strVal + " ";
          }
          //return duplicated str (x) times
          return dupValue;
        };

        vm.showMoreVenues = function (){
          if( vm.venues.length == vm.venueLimit ) {
            vm.loadMoreVenue = true;  
          }
          vm.toggleVenues = true; 
          var clearTimeout = $timeout(function(){
            vm.toggleVenues = false;
            vm.venueLimit += 5;
          }, 300);
        };

      }
  
}());