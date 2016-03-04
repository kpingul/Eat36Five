(function() {
  'use strict';
  angular.module('VenueApp')
  .controller('VenueCtrl', VenueCtrl)

  VenueCtrl.$inject = ['$scope','MapService','slickBreakpoints', '$window', '$timeout'];

  function VenueCtrl($scope,MapService, slickBreakpoints, $window,$timeout){

    //Stores the SingleVenueData Service 
    //implemented in the router 
    // $scope.venue      = venueData.venue;
    $scope.venue       = venueData;

    //Limit of user reviews in the template
    $scope.reviewLim   = 5;

    //Slick carousel configuration setup
    $scope.slickBP     = slickBreakpoints.breakpoints;


    // $scope.venuePhotos   = venueData.photos;
    // $scope.similarVenues = venueData.similarVenues;



    //business hours
    $scope.hours     = [];

    //toggles loading indicator 
    $scope.toggleReviews = false;


    //Query to send to MapService
    $scope.mapVenue = [
      {
        lat:  venueData.location.lat, 
        lng:  venueData.location.lng, 
        title:  venueData.name
      }
    ];
    //Call out to MapService to show map
    MapService.getSearchVenueMap($scope.mapVenue);


    $scope.loadMoreReviews = function() {

      $scope.toggleReviews = true;
      $timeout(function() {
        $scope.toggleReviews = false;
        $scope.reviewLim += 5;
      }, 800);
      

    }

  }   

  
}());