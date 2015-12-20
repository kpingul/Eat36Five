/**
 * Author: Kirck Pingul
 * Angular Aplication
 * 
 */

(function(){
	'use strict';
	angular.module('myApp', [
		'ui.router',
		'slick'
	])
		.run(['$rootScope', function($rootScope) {
			$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
			   $('#overlay').show();
			      
			});

			$rootScope.$on('$stateChangeSuccess',function(){
				   $('#overlay').hide();
				  //quick fix when the broswer initially reloads, it gets
				  //automatically positioned at the top
					$("html, body").animate({ scrollTop: 0 }, 0);
		
			});
	}]);
}());