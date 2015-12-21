(function() {

  'use strict';

	angular.module('myApp')

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
		.filter('menufilter', menufilter)
		.filter('timefilter', timefilter)
		.factory('MapService', MapService)
		.directive('businessHoursToolbar', [function () {
			return {
				restrict: 'A',
				scope: {
					data: "="
				},
				link: function (scope, elem, attrs) {
					var businessHoursMixin = [],
						hours = [],
						popoverBusinessHours = $('#popoverBusinessHours');

						scope.data.map( function(item, index) {

							if(item.days) {
								hours.push('<strong>' + item.days + '</strong>' , item.open[0].renderedTime + '<br />');
								businessHoursMixin = hours.join(" ");
					
							}
						});
									
						popoverBusinessHours.popover({
							trigger:'focus hover',
							html: true,
							content: businessHoursMixin
						});
						

				}
			};
		}])
		.directive('venuePhotoGallery', venuePhotoGallery)

		.controller('VenueCtrl', VenueCtrl)

		VenueCtrl.$inject = ['$scope','MapService','slickBreakpoints', '$window', '$timeout'];

		function VenueCtrl($scope,MapService, slickBreakpoints, $window,$timeout){

			//Stores the SingleVenueData Service 
			//implemented in the router 
			$scope.venue  	 	 = venueData.venue;

			//Limit of user reviews in the template
			$scope.reviewLim 	 = 5;

			//Slick carousel configuration setup
			$scope.slickBP 	 	 = slickBreakpoints.breakpoints;


			$scope.venuePhotos   = venueData.photos;
			console.log($scope.venuePhotos)
			$scope.similarVenues = venueData.similarVenues;



			//business hours
			$scope.hours 		 = [];

			//toggles loading indicator 
			$scope.toggleReviews = false;


			//Query to send to MapService
			$scope.mapVenue = [
				{
					lat:  venueData.venue.location.lat, 
					lng:  venueData.venue.location.lng, 
					title:  venueData.venue.name
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

		function timefilter(){

			return function(value){
				
				var	months 	= ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December]'],
				 	time 	= new Date(parseInt(value * 1000)),
					month 	= (time.getMonth() + 1),
					day 	= (time.getDate()),
					year 	= (time.getFullYear());

				

				return months[month - 1] + ' ' + day + ' ' + year;

			};
		}


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