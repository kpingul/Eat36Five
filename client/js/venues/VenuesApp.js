/**
 * Author: Kirck Pingul
 * Eat36Five Bootstrap File
 * 
 */

(function(){
  'use strict';
  
  angular.module('VenuesApp', [
    'ui.router',
    'slick'
  ])
  .run(['$rootScope', function($rootScope) {
    var html    = $('html, body'),
        overLay = $('#overlay');

    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams) {
        overLay.show();  
    });
    $rootScope.$on('$stateChangeSuccess',
      function(){
        overLay.hide();
        //quick fix when the broswer initially reloads, it gets
        //automatically positioned at the top
        html.animate({ scrollTop: 0 }, 0);
    });
  }]);
}());