(function() {
  'use strict';
  angular.module('VenueApp')
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
  
}());