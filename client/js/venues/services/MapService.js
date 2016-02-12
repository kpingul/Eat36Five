
(function(){

  'use strict';

  angular.module('myApp')

    .factory('MapService', MapService)

    function MapService(){
      var mapService = {
        getSearchVenueMap: getSearchVenueMap,
        getAllMarkers: getAllMarkers
      };

      var allMarkers = [];
      function getAllMarkers() {
        return allMarkers;

      }
      
      function getSearchVenueMap(venue) {

        if( venue.length > 1 ) {
          var venueInformation = getLocations(venue);
    
          var map = L.map('mapCanvas').setView([venueInformation[0].lat, venueInformation[0].lng], 13);

          L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
              maxZoom: 18,
              id: 'kpingul.cigh5xphi85bbvbm8zujsshq6',
              accessToken: 'pk.eyJ1Ijoia3Bpbmd1bCIsImEiOiJjaWdoNXhxcTk4NHdvdHltNjlzb3FvdnR1In0.tHZ6g1UHifI0spL7JFSy4Q'
          }).addTo(map);


          for (var i = 0; i < venueInformation.length; i++) {
            var html = '<div class="media"><div class="media-left"><a href=""><img class="media-object mapVenueImage" height="57"  src="' + venueInformation[i].img + '" alt="..."><span class ="mapVenueRating">' + venueInformation[i].rating + '</span></a></div><div class="media-body"><h4 class="media-heading" id="mapVenueMediaHeading"><span class="mapVenueTitle"><span>' + venueInformation[i].title + '</span></span> <small class="mapVenueStatus">(' + venueInformation[i].status + ')</small></h4><p><span class ="mapVenueAddress">' + venueInformation[i].address + ' &#x2022;</span><small class="mapVenueType">' + venueInformation[i].type + '</small> &#x2022; <small class="mapVenueUrl"><a href="' + venueInformation[i].menu + '">view menu</a></small></p></div></div>'
            allMarkers.push(L.marker([venueInformation[i].lat, venueInformation[i].lng])
              .bindPopup(html, {maxWidth: 300, minWidth: 200})
              .addTo(map));
          }

        } else { 

          var map = L.map('venue-canvas', {zoomControl: false}).setView([venue[0].lat, venue[0].lng], 14);

          L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
              maxZoom: 18,
              id: 'kpingul.cigh5xphi85bbvbm8zujsshq6',
              accessToken: 'pk.eyJ1Ijoia3Bpbmd1bCIsImEiOiJjaWdoNXhxcTk4NHdvdHltNjlzb3FvdnR1In0.tHZ6g1UHifI0spL7JFSy4Q'
          }).addTo(map);
          L.marker([venue[0].lat, venue[0].lng])
            .bindPopup(venue[0].title)
            .addTo(map);

          map.dragging.disable();
          map.touchZoom.disable();
          map.doubleClickZoom.disable();
          map.scrollWheelZoom.disable();

          // Disable tap handler, if present.
          if (map.tap) map.tap.disable();

        
        }
      
        
      }
      return mapService;
    }

    function getLocations(venue) {
      var venues = [];
      venue.map( function( item, index){
        venues.push({
          id: item.venue.id,
          type: item.venue.categories[0].name,
          address: item.venue.location.address,
          menu: item.venue.menu ? item.venue.menu.url : '',
          rating: item.venue.rating,
          status: item.venue.hours ? item.venue.hours.status : '',
          img: item.venue.categories[0].icon.prefix + 'bg_32' + item.venue.categories[0].icon.suffix,
          title: item.venue.name,
          lat: item.venue.location.lat,
          lng: item.venue.location.lng  

        });

      });

      return venues;
    }



}());